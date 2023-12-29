const commonMockRepository = () => ({
  customSave: jest.fn(),
});

export const SellerMockRepository = () =>
  Object.assign(commonMockRepository(), {
    findOneByEmail: jest.fn(),
  });

export const CustomerMockRepository = () =>
  Object.assign(commonMockRepository(), {
    findOneByEmail: jest.fn(),
  });
