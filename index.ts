import prisma from "./backend/db/client";

const run = async () => {
  const user = await prisma.user.findUnique({ where: { email: "farhan@gmail.com" }, include: { RolesUser: { select: { roles: { select: { name: true } } } } } });
  if (user === null) return;
  const roles = user.RolesUser.map(({ roles }) => roles.name);
  console.log(roles);
  console.log(JSON.stringify(Object.assign(user, { roles }), null, 4));
};

run();
