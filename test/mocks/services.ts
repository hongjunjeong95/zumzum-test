export const MockedCommonService = () => ({});

export const MockedTokenProviderService = () =>
  Object.assign(MockedCommonService(), {
    createAuthToken: jest.fn(),
  });
