/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

/** Execute all given prisma database interaction scripts written in this function */
const executeScripts = async () => {
  await setUserRole(8, Role.MEMBER);
};

/** Update user's role given userId and new role */
const setUserRole = async (id: number, role: Role) => {
  await prisma.user.update({ where: { userId: id }, data: { role } });
};

executeScripts()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('Done!');
  });
