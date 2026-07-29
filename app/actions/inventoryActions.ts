"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Fetch the user's inventory (or create a default one if it doesn't exist)
export async function getInventory() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) throw new Error("User not found");

  let inventory = await prisma.equipmentInventory.findUnique({
    where: { userId: user.id }
  });

  // If the user doesn't have an inventory yet, create the default one
  if (!inventory) {
    inventory = await prisma.equipmentInventory.create({
      data: { userId: user.id }
    });
  }

  return inventory;
}