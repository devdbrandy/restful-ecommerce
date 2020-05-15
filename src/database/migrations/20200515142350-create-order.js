export const up = (queryInterface, Sequelize) =>
  queryInterface.createTable('Orders', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    items: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    grandTotal: {
      type: Sequelize.INTEGER
    },
    status: {
      type: Sequelize.ENUM(
        'pending',
        'processed',
        'completed',
        'declined',
        'cancelled'
      ),
      defaultValue: 'pending'
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
    }
  });

export const down = queryInterface => queryInterface.dropTable('Orders');
