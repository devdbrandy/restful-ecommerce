'use strict'

export const up = async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    await queryInterface.removeColumn('Users', 'firstName')
    await queryInterface.removeColumn('Users', 'lastName')
}

export const down = async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    await queryInterface.addColumn('Users', 'firstName', Sequelize.STRING, {
        null: false,
    })
    await queryInterface.addColumn('Users', 'lastName', Sequelize.STRING, {
        null: false,
    })
}
