export type MockedModel<T> = {
  create: jest.MockedFunction<T>;
  findByPk: jest.MockedFunction<T>;
  findOne: jest.MockedFunction<T>;
};
