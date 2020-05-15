export const up = (queryInterface, Sequelize) =>
  queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    firstName: {
      allowNull: false,
      type: Sequelize.STRING
    },
    lastName: {
      allowNull: false,
      type: Sequelize.STRING
    },
    password: Sequelize.STRING,
    email: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('now')
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('now')
    },
    deletedAt: {
      allowNull: true,
      type: Sequelize.DATE
    }
  });

export const down = queryInterface => queryInterface.dropTable('Users');
