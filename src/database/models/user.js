import bcrypt from 'bcryptjs'

export default (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    name: 'users_email',
                    msg: 'A user with this email already exists.',
                },
            },
            isAdmin: DataTypes.BOOLEAN,
        },
        {
            paranoid: true,
            hooks: {
                beforeCreate: async (user, options) => {
                    const hash = await bcrypt.hash(user.password, 10)
                    user.password = hash
                },
                beforeUpdate: async (user, options) => {
                    const { _previousDataValues: previousValues, dataValues } =
                        user

                    if (
                        !(await bcrypt.compare(
                            dataValues.password,
                            previousValues.password
                        ))
                    ) {
                        const hash = await bcrypt.hash(user.password, 10)
                        user.password = hash
                    }
                },
            },
            defaultScope: {
                attributes: {
                    exclude: ['deletedAt'],
                },
            },
        }
    )

    User.associate = (models) => {
        User.hasOne(models.Cart, {
            foreignKey: 'userId',
            as: 'cart',
            onDelete: 'cascade',
        })
    }

    User.associate = (models) => {
        User.hasMany(models.Order, {
            foreignKey: 'userId',
            as: 'orders',
            onDelete: 'cascade',
        })
    }

    return User
}
