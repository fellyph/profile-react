interface MockAxios {
  get: jest.Mock;
  post: jest.Mock;
  put: jest.Mock;
  delete: jest.Mock;
  create: jest.Mock;
  defaults: {
    headers: {
      common: Record<string, string>;
    };
  };
}

const mockAxios: MockAxios = {
  get: jest.fn(() => Promise.resolve({ data: [] })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  put: jest.fn(() => Promise.resolve({ data: {} })),
  delete: jest.fn(() => Promise.resolve({ data: {} })),
  create: jest.fn(function (): MockAxios {
    return mockAxios;
  }),
  defaults: {
    headers: {
      common: {},
    },
  },
};

export default mockAxios;
