"use client";

import { useState, useEffect } from "react";
import { createWorkout } from "@/app/actions/workoutActions";
import { getInventory } from "@/app/actions/inventoryActions";
import { useRouter } from "next/navigation";
import BarbellGraphic from "@/app/components/BarbellGraphic";
import { calculateBarbellLoadout, Inventory } from "@/app/utils/plateMath";

export default function LogWorkoutPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form State
  const [title, setTitle] = useState("");
  const [sets, setSets] = useState([{ exercise: "", weight: "", reps: "" }]);

  // Live Plate Calculator State
  const [inventory, setInventory] = useState<Inventory | null>(null);
  const [previewPlates, setPreviewPlates] = useState<number[]>([]);
  const [activeWeight, setActiveWeight] = useState<number>(0);

  // 1. Fetch the user's equipment inventory when the page loads
  useEffect(() => {
    async function loadInventory() {
      try {
        const userInventory = await getInventory();
        setInventory(userInventory);
      } catch (error) {
        console.error("Failed to load inventory:", error);
      }
    }
    loadInventory();
  }, []);

  // 2. Handle weight input and trigger the Knapsack algorithm
  const handleWeightInput = (index: number, value: string) => {
    const updatedSets = [...sets];
    updatedSets[index] = { ...updatedSets[index], weight: value };
    setSets(updatedSets);

    const weightNum = Number(value);
    
    // Only run the math if the inventory has successfully loaded from the database
    if (weightNum > 0 && inventory) {
      setActiveWeight(weightNum);
      const { plates } = calculateBarbellLoadout(weightNum, inventory);
      setPreviewPlates(plates);
    } else {
      setPreviewPlates([]);
      setActiveWeight(0);
    }
  };

  const addSet = () => setSets([...sets, { exercise: "", weight: "", reps: "" }]);
  
  const updateSet = (index: number, field: string, value: string) => {
    const updatedSets = [...sets];
    updatedSets[index] = { ...updatedSets[index], [field]: value };
    setSets(updatedSets);
  };

  const removeSet = (index: number) => {
    const updatedSets = sets.filter((_, i) => i !== index);
    setSets(updatedSets);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formattedSets = sets.map((set) => ({
        exercise: set.exercise,
        weight: Number(set.weight),
        reps: Number(set.reps),
      }));
      await createWorkout(title, formattedSets);
      router.push("/dashboard");
    } catch (error) {
      console.error("Submission failed", error);
      alert("Failed to log workout.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <header className="border-b border-slate-800 pb-6">
        <h1 className="text-2xl font-semibold text-slate-100">Log Training Session</h1>
        <p className="text-slate-400 mt-1 text-sm">Record your heavy compounds and track progression.</p>
      </header>

      {/* 🚀 THE LIVE PLATE CALCULATOR */}
      <div className="bg-[#111111] p-6 rounded-xl border border-slate-800 space-y-4 shadow-2xl">
        <div className="flex justify-between items-end border-b border-slate-800 pb-2">
          <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">Live Barbell Preview</h3>
          <span className="text-xs text-slate-500">
            {!inventory ? "Fetching Inventory..." : activeWeight > 0 ? `${activeWeight} kg Target` : "Awaiting Input"}
          </span>
        </div>
        <BarbellGraphic plates={previewPlates} />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-[#111111] p-8 rounded-xl border border-slate-800">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Session Title</label>
          <input 
            type="text" 
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Heavy Lower Body" 
            className="w-full bg-[#0A0A0A] border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-800">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold text-slate-300">Working Sets</h3>
            <button 
              type="button" 
              onClick={addSet}
              className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full hover:bg-emerald-500/20 transition-colors"
            >
              + ADD SET
            </button>
          </div>

          {sets.map((set, index) => (
            <div key={index} className="grid grid-cols-12 gap-3 items-center bg-[#0A0A0A] p-4 rounded-lg border border-slate-800/50">
              <div className="col-span-5">
                <input 
                  type="text" 
                  required
                  value={set.exercise}
                  onChange={(e) => updateSet(index, "exercise", e.target.value)}
                  placeholder="e.g., Deadlift" 
                  className="w-full bg-transparent border-b border-slate-700 px-2 py-2 text-slate-200 focus:outline-none focus:border-emerald-500 text-sm"
                />
              </div>
              <div className="col-span-3 relative">
                <input 
                  type="number" 
                  required
                  min="0"
                  disabled={!inventory} // Lock input until database load completes
                  value={set.weight}
                  onChange={(e) => handleWeightInput(index, e.target.value)}
                  placeholder="Weight" 
                  className="w-full bg-transparent border-b border-slate-700 px-2 py-2 text-slate-200 focus:outline-none focus:border-emerald-500 text-sm disabled:opacity-50"
                />
                <span className="absolute right-2 top-2 text-xs text-slate-500">kg</span>
              </div>
              <div className="col-span-3 relative">
                <input 
                  type="number" 
                  required
                  min="1"
                  value={set.reps}
                  onChange={(e) => updateSet(index, "reps", e.target.value)}
                  placeholder="Reps" 
                  className="w-full bg-transparent border-b border-slate-700 px-2 py-2 text-slate-200 focus:outline-none focus:border-emerald-500 text-sm"
                />
                <span className="absolute right-2 top-2 text-xs text-slate-500">reps</span>
              </div>
              <div className="col-span-1 flex justify-center">
                {sets.length > 1 && (
                  <button 
                    type="button" 
                    onClick={() => removeSet(index)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-6">
          <button 
            type="submit" 
            disabled={isSubmitting || !inventory}
            className="w-full bg-emerald-500 text-slate-950 font-bold text-sm tracking-wide py-4 rounded-lg hover:bg-emerald-400 transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {isSubmitting ? "LOGGING DATA..." : "SAVE WORKOUT LOG"}
          </button>
        </div>
      </form>
    </div>
  );
}