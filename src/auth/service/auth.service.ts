import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BCryptUtils } from '@helpers/bcrypt.utils';
import {
  UserExistsException,
  PasswordNotMatchException,
} from '@common/exception/server-exception';
import { JWTClaim, TokenProvider } from './token-provider';
import { SignInParam, SignUpParam } from './auth.service.type';
import {
  CustomerRepositoryInterface,
  CustomerRepositoryInterfaceToken,
} from 'src/domain/customer/persistence/repository/customer.repository.interface';
import { Customer } from 'src/domain/customer/persistence/customer.entity';
import { Seller } from 'src/domain/seller/persistence/seller.entity';
import {
  SellerRepositoryInterface,
  SellerRepositoryInterfaceToken,
} from 'src/domain/seller/persistence/repository/seller.repository.interface';
import { BaseUserEntity } from '@common/entity/base-user-entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CustomerRepositoryInterfaceToken)
    private readonly customerRepository: CustomerRepositoryInterface,
    @Inject(SellerRepositoryInterfaceToken)
    private readonly sellerRepository: SellerRepositoryInterface,
    private readonly tokenProvider: TokenProvider,
  ) {}

  private getUserEntity(type: 'Seller' | 'Customer'): BaseUserEntity {
    if (type === 'Seller') {
      return new Seller();
    } else if (type === 'Customer') {
      return new Customer();
    } else {
      throw new NotFoundException('Invalid user type');
    }
  }

  private getUserRepository(type: 'Seller' | 'Customer') {
    const repository =
      type === 'Seller'
        ? this.sellerRepository
        : type === 'Customer'
        ? this.customerRepository
        : null;

    return repository;
  }

  async signUp(type: 'Seller' | 'Customer', param: SignUpParam): Promise<void> {
    const { name, email, password, confirmPassword } = param;
    const repository = this.getUserRepository(type);
    const existingUser = await repository.findOneByEmailOrFail(email);

    if (existingUser) {
      throw new UserExistsException();
    }

    if (password !== confirmPassword) {
      throw new PasswordNotMatchException();
    }

    const entity = this.getUserEntity(type);
    entity.name = name;
    entity.email = email;
    entity.password = await BCryptUtils.encrypt(password);

    await repository.customSave(entity);
  }

  async signIn(
    type: 'Seller' | 'Customer',
    param: SignInParam,
  ): Promise<string> {
    const repository = this.getUserRepository(type);

    const user = await repository.findOneByEmailOrFail(param.email);

    if (!user) {
      throw new NotFoundException();
    }

    const verified = await BCryptUtils.verify(param.password, user.password);

    if (!verified) {
      throw new PasswordNotMatchException();
    }

    const jwtClaim: JWTClaim = {
      userId: user.id,
      email: user.email,
      name: user.name,
    };

    const authToken = this.tokenProvider.createAuthToken(jwtClaim);

    await repository.customSave(user);

    return authToken;
  }
}
