export const MockedCommonService = () => ({});

export const TokenProviderMockService = () =>
  Object.assign(MockedCommonService(), {
    createAuthToken: jest.fn(),
  });

export const CacheMockService = () =>
  Object.assign(MockedCommonService(), {
    generateCacheKeyForHoliday: jest.fn(),
    get: jest.fn(),
    set: jest.fn(),
    delete: jest.fn(),
  });
