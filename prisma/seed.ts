import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const productData: Prisma.ProductCreateInput[] = [
    {
        title: 'Tricko',
        description: 'Tricko - z bavlny',
        price: 1500,
        imageUrl: '',
        slug: 'tricko',
        stock: 2,
    },
    {
        title: 'Sroubky',
        description: 'Sroubky - krabicka',
        price: 100,
        imageUrl: '',
        slug: 'sroubky',
        stock: 100,
    }
]

const userData: Prisma.UserCreateInput[] = [
    {
        email: 'admin@example.com',
        password: 'secret',
        isAdmin: true,
    },
    {
        email: 'user@example.com',
        password: 'secret',
    },
]

async function main() {
    console.log(`Start seeding ...`)
    for (const p of productData) {
        const product = await prisma.product.create({
            data: p,
        })
        console.log(`Created product with id: ${product.id}`)
    }
    console.log(`Seeding finished.`)
    
    for (const u of userData) {
        const user = await prisma.user.create({
            data: u,
        })
        console.log(`Created user with id: ${user.id}`)
    }
    console.log(`Seeding finished.`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
