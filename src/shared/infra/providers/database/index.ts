import { PrismaUsersRepository } from "./implementations/prisma/usersRepository";
import { PrismaClient } from "generated/prisma";

export const usersRepository = new PrismaUsersRepository(new PrismaClient());
