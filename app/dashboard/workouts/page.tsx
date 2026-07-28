"use client";

import { useState } from "react";
import { createWorkout } from "@/app/actions/workoutActions";
import { useRouter } from "next/navigation";

export default function LogWorkoutPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form State
  const [title, setTitle] = useState("");
  const [sets, setSets] = useState([{ exercise: "", weight: "", reps: "" }]);

  // Add a new empty set to the UI
  const addSet = () => {
    setSets([...sets, { exercise: "", weight: "", reps: "" }]);
  };

  // Update a specific set's data
  const updateSet = (index: number, field: string, value: string) => {
    const updatedSets = [...sets];
    updatedSets[index] = { ...updatedSets[index], [field]: value };
    setSets(updatedSets);
  };

  // Remove a set from the UI
  const removeSet = (index: number) => {
    const updatedSets = sets.filter((_, i) => i !== index);
    setSets(updatedSets);
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Convert string inputs to numbers for the database
      const formattedSets = sets.map((set) => ({
        exercise: set.exercise,
        weight: Number(set.weight),
        reps: Number(set.reps),
      }));

      // Call the Server Action we built yesterday
      await createWorkout(title, formattedSets);
      
      // Redirect back to the dashboard on success
      router.push("/dashboard");
    } catch (error) {
      console.error("Submission failed", error);
      alert("Failed to log workout. Please try again.");
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

      <form onSubmit={handleSubmit} className="space-y-6 bg-[#111111] p-8 rounded-xl border border-slate-800">
        
        {/* Workout Title */}
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

        {/* Dynamic Sets Area */}
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
                  value={set.weight}
                  onChange={(e) => updateSet(index, "weight", e.target.value)}
                  placeholder="Weight" 
                  className="w-full bg-transparent border-b border-slate-700 px-2 py-2 text-slate-200 focus:outline-none focus:border-emerald-500 text-sm"
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
                    title="Remove Set"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-emerald-500 text-slate-950 font-bold text-sm tracking-wide py-4 rounded-lg hover:bg-emerald-400 transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {isSubmitting ? "LOGGING DATA..." : "SAVE WORKOUT LOG"}
          </button>
        </div>
      </form>
    </div>
  );
}