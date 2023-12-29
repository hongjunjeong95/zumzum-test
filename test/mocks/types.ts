export type MockRepository<T = any> = Partial<Record<keyof T, jest.Mock>>;
export type MockService<T = any> = Partial<Record<keyof T, jest.Mock>>;
