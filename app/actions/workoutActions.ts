"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

// Updated to match the fields required by your Set model
interface SetData {
  exercise: string; 
  weight: number;
  reps: number;
}

export async function createWorkout(workoutTitle: string, sets: SetData[]) {
  // 1. Security Check
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    throw new Error("Unauthorized: You must be logged in to log a workout.");
  }

  // 2. Database Lookup
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    throw new Error("User record not found in the database.");
  }

  // 3. Database Write
  try {
    await prisma.workout.create({
      data: {
        userId: user.id,
        title: workoutTitle, // Fixed: Using 'title' instead of 'name'
        sets: {
          create: sets.map((set) => ({
            exercise: set.exercise, // Fixed: Adding the required 'exercise' field
            weight: set.weight,
            reps: set.reps,
          })),
        },
      },
    });

    // 4. Cache Clearing
    revalidatePath("/dashboard");
    
    return { success: true };
    
  } catch (error) {
    console.error("Failed to log workout:", error);
    throw new Error("Failed to save workout to the database.");
  }
}