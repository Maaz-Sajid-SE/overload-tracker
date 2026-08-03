"use server";

import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function getExerciseAnalytics(exerciseName: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) throw new Error("User not found");

  // 1. Fetch chronological workouts containing the specific exercise
  const workouts = await prisma.workout.findMany({
    where: {
      userId: user.id,
      sets: {
        some: {
          exercise: {
            equals: exerciseName,
            mode: "insensitive", // Matches "Deadlift", "deadlift", or "DEADLIFT"
          },
        },
      },
    },
    include: {
      // Only pull the sets for THIS specific exercise to save memory
      sets: {
        where: {
          exercise: {
            equals: exerciseName,
            mode: "insensitive",
          },
        },
      },
    },
    orderBy: {
      createdAt: "asc", // Sorts from oldest to newest for the time-series chart
    },
  });

  // 2. Data Transformation: Map raw DB records into chart-friendly coordinates
  const chartData = workouts.map((workout) => {
    // Extract an array of just the weights lifted in this session
    const weightsArray = workout.sets.map((set) => set.weight);
    
    // Find the heaviest weight lifted that day
    const maxWeight = Math.max(...weightsArray);

    return {
      // Formats the timestamp into a clean chart label (e.g., "Aug 3")
      date: workout.createdAt.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      maxWeight: maxWeight,
    };
  });

  return chartData;
}