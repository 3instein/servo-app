import { prisma } from "@/lib/prisma";
import { Prisma } from "../app/generated/prisma";

const eventData: Prisma.EventCreateInput[] = [
  {
    name: "PMC BATCH 3",
    date: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    location: "Jakarta",
  },
];

export async function main() {
  for (const e of eventData) {
    await prisma.event.create({ data: e });
  }
}

main();