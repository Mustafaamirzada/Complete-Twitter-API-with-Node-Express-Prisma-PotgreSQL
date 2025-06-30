import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function seed() {
  await prisma.user.createMany({
    data: [
      {
        name: "Bob",
        lname: "Doo",
        age : 29,
        email: "bob@gmail.com"
      },
      {
        name: "Mike",
        lname: "Anglelo",
        age: 40,
        email: "mike@gmail.com"
      },
      {
        name: "Trump",
        lname: "Donal",
        age: 56,
        email: "donal@gmail.com"
      },
      {
        name: "Donal",
        lname: "Trumo",
        age: 64,
        email: "trump@gmail.com"
      },
      {
        name: "mustafa",
        lname: "amirzada",
        age: 21,
        email: "mustafa@gmail.com"
      },
    ]
  })
}

seed().then(() => prisma.$disconnect());
