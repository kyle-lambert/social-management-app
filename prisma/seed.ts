import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      firstName: "Kyle",
      lastName: "Lambert",
      email: "kyle@gmail.com",
      password: {
        create: {
          hash: "$2a$10$Mg0vGWvObZJi1KQoSL7aUenmFGXYzqNKHswHWP2Z5CaFgo9L/Y1du", // password
        },
      },
    },
  });

  console.log("Database has been seeded. 🌱");
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
