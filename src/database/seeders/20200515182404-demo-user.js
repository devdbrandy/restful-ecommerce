import { userFactory } from '@factories/user'

export const up = async (queryInterface) => {
    const password =
        '$2a$10$QRUIZwSPLLkS4BVJQZ75wu6LROYIqe5eKMsWYV2C21bCnUNS51NAK' // secret
    const admin = userFactory({
        email: 'admin@example.com',
        password,
        isAdmin: true,
    })

    const user = userFactory({
        email: 'user@example.com',
        password,
    })

    await queryInterface.bulkInsert('Users', [admin, user], {})
}

export const down = (queryInterface) =>
    queryInterface.bulkDelete('Users', null, {})
