'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

        await queryInterface.addColumn('Products', 'slug', Sequelize.STRING, {
            unique: true,
        })

        await queryInterface.addColumn('Products', 'stock', Sequelize.INTEGER, {
            default: 0,
        })
    },

    down: async (queryInterface, Sequelize) => {
        /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
        await queryInterface.removeColumn('Products', 'slug')
        await queryInterface.removeColumn('Products', 'stock')
    },
}
