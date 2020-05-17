import models from '@models';

module.exports = async () => {
  await models.sequelize.drop();
  await models.sequelize.sync({ force: true });
};
