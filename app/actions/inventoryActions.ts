"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

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

// Define the exact shape of the data we expect from the frontend
type InventoryPayload = {
  plate25kg: number;
  plate20kg: number;
  plate15kg: number;
  plate10kg: number;
  plate5kg: number;
  plate2_5kg: number;
  plate1_25kg: number;
};

export async function saveInventory(newInventory: InventoryPayload) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({ 
    where: { email: session.user.email } 
  });
  
  if (!user) throw new Error("User not found");

  // Securely update the user's specific inventory row in PostgreSQL
  await prisma.equipmentInventory.update({
    where: { userId: user.id },
    data: {
      plate25kg: newInventory.plate25kg,
      plate20kg: newInventory.plate20kg,
      plate15kg: newInventory.plate15kg,
      plate10kg: newInventory.plate10kg,
      plate5kg: newInventory.plate5kg,
      plate2_5kg: newInventory.plate2_5kg,
      plate1_25kg: newInventory.plate1_25kg,
    },
  });

  // 🧹 Cache Invalidation: This forces Next.js to instantly clear its cache 
  // so the Barbell Calculator page sees the new plates immediately.
  revalidatePath("/dashboard/workouts");
  revalidatePath("/dashboard/settings");

  return { success: true };
}