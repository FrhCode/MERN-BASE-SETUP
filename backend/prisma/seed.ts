import { PrismaClient, Roles } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
import slugify from "slugify";

async function main() {
  await prisma.user.deleteMany({ where: {} });
  await prisma.roles.deleteMany({ where: {} });

  await prisma.roles.createMany({
    data: [
      {
        name: "admin",
        id: slugify("admin")
      },
      {
        name: "author",
        id: slugify("author")
      }
    ]
  });
  const { id: rolesAdminId } = (await prisma.roles.findUnique({ where: { name: "admin" } })) as Roles;
  const { id: rolesAuthorId } = (await prisma.roles.findUnique({ where: { name: "author" } })) as Roles;

  let hash = bcrypt.hashSync("asdd", 10);

  await prisma.user.createMany({
    data: [
      { password: bcrypt.hashSync("asdd", 10), name: "farhan", email: "farhan@gmail.com" },
      { password: bcrypt.hashSync("asdd", 10), name: "zydan", email: "zydan@gmail.com" },
      { password: bcrypt.hashSync("asdd", 10), name: "rina", email: "rina@gmail.com" }
    ]
  });

  await prisma.user.update({
    where: { email: "farhan@gmail.com" },
    data: {
      RolesUser: {
        create: [
          {
            rolesId: rolesAdminId
          }
        ]
      }
    }
  });

  await prisma.user.update({
    where: { email: "zydan@gmail.com" },
    data: {
      RolesUser: {
        create: [
          {
            rolesId: rolesAuthorId
          }
        ]
      }
    }
  });

  // await prisma.user.update({
  //   where: {
  //     email: "farhan"
  //   },
  //   data: { RolesUser: { connect: [{ rolesId_userId: "1" }] } }
  // });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
