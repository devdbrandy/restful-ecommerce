import bcrypt from 'bcryptjs';

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          name: 'users_email',
          msg: 'A user with this email already exists.'
        }
      },
      isAdmin: DataTypes.BOOLEAN
    },
    {
      paranoid: true,
      hooks: {
        beforeCreate: (user, options) => {
          const hash = bcrypt.hashSync(user.password, 10);
          user.password = hash;
        },
        beforeUpdate: (user, options) => {
          const { _previousDataValues: previousValues, dataValues } = user;

          if (
            !bcrypt.compareSync(dataValues.password, previousValues.password)
          ) {
            const hash = bcrypt.hashSync(user.password, 10);
            user.password = hash;
          }
        }
      },
      defaultScope: {
        attributes: {
          exclude: ['deletedAt']
        }
      }
    }
  );

  User.associate = models => {
    User.hasOne(models.Cart, {
      foreignKey: 'userId',
      as: 'cart',
      onDelete: 'cascade'
    });
  };

  User.associate = models => {
    User.hasMany(models.Order, {
      foreignKey: 'userId',
      as: 'orders',
      onDelete: 'cascade'
    });
  };

  return User;
};
