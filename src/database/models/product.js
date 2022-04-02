import SequelizeSlugify from 'sequelize-slugify'
export default (sequelize, DataTypes) => {
    const Product = sequelize.define(
        'Product',
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            price: {
                type: DataTypes.INTEGER,
            },
            imageUrl: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            slug: {
                type: DataTypes.STRING,
                unique: true,
            },
        },
        {
            paranoid: true,
            hooks: {},
            defaultScope: {
                attributes: {
                    exclude: ['deletedAt'],
                },
            },
        }
    )
    SequelizeSlugify.slugifyModel(Product, { source: ['title'] })

    return Product
}
