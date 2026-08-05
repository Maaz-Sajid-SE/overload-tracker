"use client";

import { useState } from "react";

// The shape of our plate inventory
type PlateInventory = {
  twentyFives: number;
  twenties: number;
  fifteens: number;
  tens: number;
  fives: number;
  twoPointFives: number;
  onePointTwoFives: number;
};

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);
  
  // Day 3 Placeholder State (We will wire this to PostgreSQL on Day 4)
  const [inventory, setInventory] = useState<PlateInventory>({
    twentyFives: 0,
    twenties: 6,
    fifteens: 2,
    tens: 2,
    fives: 2,
    twoPointFives: 2,
    onePointTwoFives: 2,
  });

  // Reusable configuration to map out our UI dynamically
  const plateConfig = [
    { key: "twentyFives", label: "25 kg Plates", accent: "border-red-500/30 text-red-400" },
    { key: "twenties", label: "20 kg Plates", accent: "border-blue-500/30 text-blue-400" },
    { key: "fifteens", label: "15 kg Plates", accent: "border-yellow-500/30 text-yellow-400" },
    { key: "tens", label: "10 kg Plates", accent: "border-green-500/30 text-green-400" },
    { key: "fives", label: "5 kg Plates", accent: "border-slate-500/30 text-slate-100" },
    { key: "twoPointFives", label: "2.5 kg Plates", accent: "border-slate-500/30 text-slate-300" },
    { key: "onePointTwoFives", label: "1.25 kg Plates", accent: "border-slate-500/30 text-slate-400" },
  ] as const;

  const updatePlateCount = (plateKey: keyof PlateInventory, increment: number) => {
    setInventory((prev) => ({
      ...prev,
      [plateKey]: Math.max(0, prev[plateKey] + increment), // Prevents negative plate counts
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulation for Day 3. True DB connection coming in Day 4.
    setTimeout(() => setIsSaving(false), 1000); 
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <header className="border-b border-slate-800 pb-6">
        <h1 className="text-2xl font-semibold text-slate-100">Equipment Inventory</h1>
        <p className="text-slate-400 mt-1 text-sm">
          Configure your available plates so the Barbell Calculator knows exactly what you have.
        </p>
      </header>

      <div className="bg-[#111111] p-6 rounded-xl border border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {plateConfig.map((plate) => (
            <div 
              key={plate.key} 
              className="flex items-center justify-between p-4 bg-[#0A0A0A] border border-slate-800/50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-8 rounded-sm border-2 bg-slate-900 ${plate.accent}`} />
                <span className="text-sm font-semibold text-slate-200">{plate.label}</span>
              </div>
              
              <div className="flex items-center gap-4 bg-slate-900 rounded-lg border border-slate-800">
                <button 
                  onClick={() => updatePlateCount(plate.key, -2)}
                  className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                  aria-label="Decrease"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" /></svg>
                </button>
                
                <span className="text-base font-bold text-slate-100 w-4 text-center">
                  {inventory[plate.key]}
                </span>
                
                <button 
                  onClick={() => updatePlateCount(plate.key, 2)}
                  className="p-2 text-slate-400 hover:text-emerald-400 transition-colors"
                  aria-label="Increase"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                </button>
              </div>
            </div>
          ))}

        </div>

        <div className="mt-8 pt-6 border-t border-slate-800">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="w-full bg-emerald-500 text-slate-950 font-bold text-sm tracking-wide py-4 rounded-lg hover:bg-emerald-400 transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {isSaving ? "SAVING INVENTORY..." : "SAVE INVENTORY SETTINGS"}
          </button>
        </div>
      </div>
    </div>
  );
}