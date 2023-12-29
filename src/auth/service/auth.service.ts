import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BCryptUtils } from '@helpers/bcrypt.utils';
import {
  UserExistsException,
  PasswordNotMatchException,
} from '@common/filters/server-exception';
import { JWTClaim, TokenProvider } from './token-provider';
import { SignInParam, SignUpParam } from './auth.service.type';
import { BaseUserEntity, UserRole } from '@common/entity/base-user-entity';
import {
  CustomerRepositoryInterface,
  CustomerRepositoryInterfaceToken,
} from '@domain/customer/persistence/repository/customer.repository.interface';
import {
  SellerRepositoryInterface,
  SellerRepositoryInterfaceToken,
} from '@domain/seller/persistence/repository/seller.repository.interface';
import { Seller } from '@domain/seller/persistence/seller.entity';
import { Customer } from '@domain/customer/persistence/customer.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CustomerRepositoryInterfaceToken)
    private readonly customerRepository: CustomerRepositoryInterface,
    @Inject(SellerRepositoryInterfaceToken)
    private readonly sellerRepository: SellerRepositoryInterface,
    private readonly tokenProvider: TokenProvider,
  ) {}

  private getUserEntity(type: UserRole): BaseUserEntity {
    if (type === UserRole.SELLER) {
      return new Seller();
    } else if (type === UserRole.CUSTOMER) {
      return new Customer();
    } else {
      throw new NotFoundException('Invalid user type');
    }
  }

  private getUserRepository(role: UserRole) {
    const repository =
      role === UserRole.SELLER
        ? this.sellerRepository
        : role === UserRole.CUSTOMER
        ? this.customerRepository
        : null;

    return repository;
  }

  async signUp(role: UserRole, param: SignUpParam): Promise<void> {
    const { name, email, password, confirmPassword } = param;
    const repository = this.getUserRepository(role);
    const existingUser = await repository.findOneByEmail(email);

    if (existingUser) {
      throw new UserExistsException();
    }

    if (password !== confirmPassword) {
      throw new PasswordNotMatchException();
    }

    const entity = this.getUserEntity(role);
    entity.name = name;
    entity.email = email;
    entity.password = await BCryptUtils.encrypt(password);

    await repository.customSave(entity);
  }

  async signIn(role: UserRole, param: SignInParam): Promise<string> {
    const repository = this.getUserRepository(role);
    const user = await repository.findOneByEmailOrFail(param.email);

    const verified = await BCryptUtils.verify(param.password, user.password);
    if (!verified) {
      throw new PasswordNotMatchException();
    }

    const jwtClaim: JWTClaim = {
      userId: user.id,
      email: user.email,
      name: user.name,
      role,
    };

    const authToken = this.tokenProvider.createAuthToken(jwtClaim);
    await repository.customSave(user);
    return authToken;
  }
}
