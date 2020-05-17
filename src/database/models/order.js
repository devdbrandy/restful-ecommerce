export default (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    items: {
      type: DataTypes.TEXT,
      allowNull: false,
      get(value) {
        return JSON.parse(this.getDataValue(value));
      },
      set(value) {
        this.setDataValue('items', JSON.stringify(value));
      }
    },
    grandTotal: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM(
        'pending',
        'processed',
        'completed',
        'declined',
        'cancelled'
      ),
      defaultValue: 'pending'
    }
  });

  Order.associate = models => {
    Order.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'order'
    });
  };

  return Order;
};
