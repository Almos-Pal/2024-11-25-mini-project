import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < 10; i++) {
    const team = await prisma.team.create({
      data: {
        country: faker.location.country(),
        players: {
          create: Array.from({ length: faker.number.int({ min: 5, max: 15 }) }).map(() => ({
            name: faker.person.fullName(),
            goalCount: faker.number.int({ min: 0, max: 50 }),
            birthDate: faker.date.birthdate({ min: 18, max: 40, mode: 'age' }),
          })),
        },
      },
    });
    console.log(`Created team ${team.country} with players`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
