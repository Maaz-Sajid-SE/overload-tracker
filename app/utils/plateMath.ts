// Define the shape of the inventory coming from Prisma
export interface Inventory {
  plate25kg: number;
  plate20kg: number;
  plate15kg: number;
  plate10kg: number;
  plate5kg: number;
  plate2_5kg: number;
  plate1_25kg: number;
  barbellWeight: number;
}

export function calculateBarbellLoadout(targetWeight: number, inventory: Inventory) {
  // 1. Subtract the weight of the barbell itself
const remainingWeight = targetWeight - inventory.barbellWeight;
  
  // 2. We only calculate plates for ONE side of the barbell
  let weightPerSide = remainingWeight / 2;
  
  const platesToLoad: number[] = [];
  
  // 3. Map out the inventory. We divide the total plates by 2 
  // to know exactly how many we can put on one side.
  const plateTypes = [
    { weight: 25, availablePerSide: Math.floor(inventory.plate25kg / 2) },
    { weight: 20, availablePerSide: Math.floor(inventory.plate20kg / 2) },
    { weight: 15, availablePerSide: Math.floor(inventory.plate15kg / 2) },
    { weight: 10, availablePerSide: Math.floor(inventory.plate10kg / 2) },
    { weight: 5, availablePerSide: Math.floor(inventory.plate5kg / 2) },
    { weight: 2.5, availablePerSide: Math.floor(inventory.plate2_5kg / 2) },
    { weight: 1.25, availablePerSide: Math.floor(inventory.plate1_25kg / 2) },
  ];

  // 4. The Greedy Algorithm: Iterate from heaviest to lightest
  for (const plate of plateTypes) {
    while (weightPerSide >= plate.weight && plate.availablePerSide > 0) {
      platesToLoad.push(plate.weight); // Add the plate to our visual array
      weightPerSide -= plate.weight;   // Deduct the weight
      plate.availablePerSide--;        // Remove the plate from our temporary inventory
    }
  }

  // Return the array of plates (e.g., [20, 20, 10, 2.5]) and any weight we couldn't match
  return {
    plates: platesToLoad,
    unmatchedWeight: weightPerSide * 2 // Multiply back by 2 to show total missed weight
  };
}