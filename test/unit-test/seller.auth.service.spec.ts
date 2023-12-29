import { AuthService } from '@auth/service/auth.service';
import { Test, TestingModule } from '@nestjs/testing';

import { MockRepository } from '../mocks/types';
import {
  SellerRepositoryInterface,
  SellerRepositoryInterfaceToken,
} from '@domain/seller/persistence/repository/seller.repository.interface';
import {
  CustomerRepositoryInterface,
  CustomerRepositoryInterfaceToken,
} from '@domain/customer/persistence/repository/customer.repository.interface';
import {
  CustomerMockRepository,
  SellerMockRepository,
} from '../mocks/repositories';
import { UserRole } from '@common/entity/base-user-entity';
import { SignUpParam } from '@auth/service/auth.service.type';
import { getMockSeller } from '../mocks/fixtures/seller';
import {
  PasswordNotMatchException,
  UserExistsException,
} from '@common/filters/server-exception';
import { TokenProvider } from '@auth/service/token-provider';
import { MockedTokenProviderService } from '../../test/mocks/services';

describe(AuthService.name, () => {
  let service: AuthService;
  let sellerRepository: MockRepository<SellerRepositoryInterface>;
  let customerRepository: MockRepository<CustomerRepositoryInterface>;

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
    customerRepository = module.get(CustomerRepositoryInterfaceToken);
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
});
