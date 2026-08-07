export type Inventory = {
  plate25kg: number;
  plate20kg: number;
  plate15kg: number;
  plate10kg: number;
  plate5kg: number;
  plate2_5kg: number;
  plate1_25kg: number;
  barbellWeight?: number;
};

export function calculateBarbellLoadout(targetWeight: number, inventory: Inventory) {
  // Default to a standard 20kg Olympic bar if not specified
  const barWeight = inventory.barbellWeight || 20.0;
  
  // How much weight needs to go on ONE side of the barbell
  let weightPerSide = (targetWeight - barWeight) / 2;
  const plates: number[] = [];
  
  // If the target weight is less than or equal to the bar itself, return an empty bar
  if (weightPerSide <= 0) return { plates };

  // Map the available hardware into pairs (since you load a bar symmetrically)
  const availablePlates = [
    { weight: 25, pairs: Math.floor(inventory.plate25kg / 2) },
    { weight: 20, pairs: Math.floor(inventory.plate20kg / 2) },
    { weight: 15, pairs: Math.floor(inventory.plate15kg / 2) },
    { weight: 10, pairs: Math.floor(inventory.plate10kg / 2) },
    { weight: 5, pairs: Math.floor(inventory.plate5kg / 2) },
    { weight: 2.5, pairs: Math.floor(inventory.plate2_5kg / 2) },
    { weight: 1.25, pairs: Math.floor(inventory.plate1_25kg / 2) },
  ];

  // The Greedy Knapsack Algorithm with Hardware Constraints
  for (const plate of availablePlates) {
    while (weightPerSide >= plate.weight && plate.pairs > 0) {
      plates.push(plate.weight);
      weightPerSide -= plate.weight;
      plate.pairs--; // Deduct the pair from physical inventory
    }
  }

  return { plates };
}