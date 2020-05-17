export default (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cartItem: {
      type: DataTypes.TEXT,
      allowNull: false,
      get(value) {
        return JSON.parse(this.getDataValue(value));
      },
      set(value) {
        this.setDataValue('cartItem', JSON.stringify(value));
      }
    }
  });

  Cart.associate = models => {
    Cart.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'owner'
    });
  };

  return Cart;
};
