import { prisma } from "../lib/prisma";
import { Prisma } from "../app/generated/prisma";
import bcrypt from "bcryptjs";

const eventData: Prisma.EventCreateInput[] = [
  {
    name: "PMC BATCH 3",
    date: new Date(),
    startTime: new Date(new Date().setHours(13, 0, 0, 0)),
    endTime: new Date(new Date().setHours(20, 0, 0, 0)),
    location: "EAGLEKIDZ 1",
  },
  {
    name: "IBADAH AOG YOUTH",
    date: new Date(),
    startTime: new Date(new Date().setHours(18, 30, 0, 0)),
    endTime: new Date(new Date().setHours(21, 0, 0, 0)),
    location: "MAINHALL",
  },
  {
    name: "IBADAH AOG YOUTH",
    date: new Date(),
    startTime: new Date(new Date().setHours(13, 0, 0, 0)),
    endTime: new Date(new Date().setHours(20, 0, 0, 0)),
    location: "MAINHALL",
  },
  {
    name: "IBADAH AOG YOUTH",
    date: new Date(),
    startTime: new Date(new Date().setHours(13, 0, 0, 0)),
    endTime: new Date(new Date().setHours(20, 0, 0, 0)),
    location: "MAINHALL",
  },
];

const userData: Prisma.UserCreateInput[] = [
  {
    username: "admin",
    password: bcrypt.hashSync("admin", 10),
  },
];

export async function main() {
  // Clear existing events
  await prisma.event.deleteMany();
  await prisma.user.deleteMany();
  // Create new events
  for (const e of eventData) {
    await prisma.event.create({ data: e });
  }
  // Create new users
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });