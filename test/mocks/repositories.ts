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

export const TourMockRepository = () =>
  Object.assign(commonMockRepository(), {
    findLastOne: jest.fn(),
    findAvailableToursInMonth: jest.fn(),
    findOneByTourContentIdAndLocaleDateStringOrFail: jest.fn(),
  });

export const TourContentMockRepository = () =>
  Object.assign(commonMockRepository(), {});
