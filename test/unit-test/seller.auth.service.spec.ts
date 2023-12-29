import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { AuthService } from '@auth/service/auth.service';
import { MockRepository, MockService } from '../mocks/types';
import {
  SellerRepositoryInterface,
  SellerRepositoryInterfaceToken,
} from '@domain/seller/persistence/repository/seller.repository.interface';
import { CustomerRepositoryInterfaceToken } from '@domain/customer/persistence/repository/customer.repository.interface';
import {
  CustomerMockRepository,
  SellerMockRepository,
} from '../mocks/repositories';
import { UserRole } from '@common/entity/base-user-entity';
import { SignInParam, SignUpParam } from '@auth/service/auth.service.type';
import { getMockSeller } from '../mocks/fixtures/seller';
import {
  PasswordNotMatchException,
  UserExistsException,
} from '@common/filters/server-exception';
import { TokenProvider } from '@auth/service/token-provider';
import { MockedTokenProviderService } from '../../test/mocks/services';
import { BCryptUtils } from '@helpers/bcrypt.utils';
import { Seller } from '@domain/seller/persistence/seller.entity';

describe(AuthService.name, () => {
  let service: AuthService;
  let sellerRepository: MockRepository<SellerRepositoryInterface>;
  let tokenProvider: MockService<TokenProvider>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        AuthService,
        {
          provide: SellerRepositoryInterfaceToken,
          useValue: SellerMockRepository(),
        },
        {
          provide: CustomerRepositoryInterfaceToken,
          useValue: CustomerMockRepository(),
        },
        {
          provide: TokenProvider,
          useValue: MockedTokenProviderService(),
        },
      ],
    }).compile();

    service = module.get(AuthService);
    sellerRepository = module.get(SellerRepositoryInterfaceToken);
    tokenProvider = module.get(TokenProvider);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signUp', () => {
    it(`returns ${UserExistsException.name} when a user with email already exists`, async () => {
      const seller = await getMockSeller();
      sellerRepository.findOneByEmail?.mockResolvedValue(seller);
      const role = UserRole.SELLER;
      const param: SignUpParam = {
        name: '이름',
        email: seller.email,
        password: '12345678',
        confirmPassword: '12345678',
      };

      try {
        await service.signUp(role, param);
      } catch (error: any) {
        expect(sellerRepository.findOneByEmail).toHaveBeenCalled();
        expect(error).toBeInstanceOf(UserExistsException);
      }
    });

    it(`returns ${PasswordNotMatchException.name} when a password and confirmPassword doesn't match`, async () => {
      const role = UserRole.SELLER;
      const param: SignUpParam = {
        name: '이름',
        email: 'seller2@gmail.com',
        password: '12345678',
        confirmPassword: 'wrong12345678',
      };
      sellerRepository.findOneByEmail?.mockResolvedValue(null);

      try {
        await service.signUp(role, param);
      } catch (error: any) {
        expect(sellerRepository.findOneByEmail).toHaveBeenCalled();
        expect(error).toBeInstanceOf(PasswordNotMatchException);
      }
    });

    it('should sign up successfully', async () => {
      const role = UserRole.SELLER;
      const param: SignUpParam = {
        name: '이름',
        email: 'seller2@gmail.com',
        password: '12345678',
        confirmPassword: '12345678',
      };
      const seller = await getMockSeller();
      sellerRepository.findOneByEmail?.mockResolvedValue(null);
      sellerRepository.customSave?.mockResolvedValue(seller);

      await service.signUp(role, param);

      expect(sellerRepository.findOneByEmail).toHaveBeenCalled();
      expect(sellerRepository.customSave).toHaveBeenCalled();
    });
  });

  describe('signIn', () => {
    it(`returns ${NotFoundException.name} when there is no user with a email`, async () => {
      sellerRepository.findOneByEmailOrFail?.mockRejectedValue(
        new NotFoundException(`${Seller.name}가 존재하지 않습니다.`),
      );
      const role = UserRole.SELLER;
      const param: SignInParam = {
        email: 'seller2@gmail.com',
        password: '12345678',
      };

      try {
        await service.signIn(role, param);
      } catch (error: any) {
        expect(sellerRepository.findOneByEmailOrFail).toHaveBeenCalled();
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it(`returns ${PasswordNotMatchException.name} when a password from param doesn't match with a password on the database`, async () => {
      const seller = getMockSeller();
      sellerRepository.findOneByEmailOrFail?.mockResolvedValue(seller);
      const role = UserRole.SELLER;
      const param: SignInParam = {
        email: 'seller2@gmail.com',
        password: '12345678',
      };
      BCryptUtils.verify = jest.fn(
        async (password: string, hashedPassword: string) => {
          return false;
        },
      );

      try {
        await service.signIn(role, param);
      } catch (error: any) {
        expect(sellerRepository.findOneByEmailOrFail).toHaveBeenCalled();
        expect(error).toBeInstanceOf(PasswordNotMatchException);
      }
    });

    it('should sign in successfully', async () => {
      const seller = getMockSeller();
      sellerRepository.findOneByEmailOrFail?.mockResolvedValue(seller);
      const role = UserRole.SELLER;
      const param: SignInParam = {
        email: 'seller2@gmail.com',
        password: '12345678',
      };
      BCryptUtils.verify = jest.fn(
        async (password: string, hashedPassword: string) => {
          return true;
        },
      );
      const token = 'toeknaslkdfjwlfsakljfiewjliej243u2394';
      tokenProvider.createAuthToken.mockResolvedValue(token);

      const result = await service.signIn(role, param);

      expect(sellerRepository.findOneByEmailOrFail).toHaveBeenCalled();
      expect(sellerRepository.customSave).toHaveBeenCalled();
      expect(result).toBe(token);
    });
  });
});
