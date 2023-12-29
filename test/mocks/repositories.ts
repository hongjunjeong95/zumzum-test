const commonMockRepository = () => ({
  customSave: jest.fn(),
  findOneByIdOrFail: jest.fn(),
});

export const SellerMockRepository = () =>
  Object.assign(commonMockRepository(), {
    findOneByEmail: jest.fn(),
    findOneByEmailOrFail: jest.fn(),
  });

export const CustomerMockRepository = () =>
  Object.assign(commonMockRepository(), {
    findOneByEmail: jest.fn(),
    findOneByEmailOrFail: jest.fn(),
  });

export const ReservationMockRepository = () =>
  Object.assign(commonMockRepository(), {
    getCurrentReservationCount: jest.fn(),
    findOneByTokenOrFail: jest.fn(),
    findOneByIdWithTourOrFail: jest.fn(),
  });
