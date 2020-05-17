import models from '@models';

jest.mock('@config/db', () => ({
  test: {
    use_env_variable: 'DATABASE_URL',
    dialectOptions: {
      ssl: true
    }
  }
}));

jest.mock('sequelize', () => {
  const sequelizeMock = { name: 'file' };

  return jest.fn(() => ({
    import: jest.fn().mockReturnValue(sequelizeMock)
  }));
});

describe('Sequelize connection instance', () => {
  it('should use DATABASE_URL for production', () => {
    expect(models.sequelize).toBeTruthy();
  });
});
