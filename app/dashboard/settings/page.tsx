"use client";

import { useState, useEffect } from "react";
import { getInventory, saveInventory } from "@/app/actions/inventoryActions";

// The shape of our plate inventory matching schema.prisma exactly
type PlateInventory = {
  plate25kg: number;
  plate20kg: number;
  plate15kg: number;
  plate10kg: number;
  plate5kg: number;
  plate2_5kg: number;
  plate1_25kg: number;
};

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [inventory, setInventory] = useState<PlateInventory>({
    plate25kg: 0, plate20kg: 0, plate15kg: 0, plate10kg: 0, 
    plate5kg: 0, plate2_5kg: 0, plate1_25kg: 0,
  });

  // 1. Fetch live data from PostgreSQL on mount
  useEffect(() => {
    const fetchMyInventory = async () => {
      try {
        const data = await getInventory();
        if (data) {
          setInventory(data as PlateInventory);
        }
      } catch (error) {
        console.error("Failed to load inventory:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMyInventory();
  }, []);

  const plateConfig = [
    { key: "plate25kg", label: "25 kg Plates", accent: "border-red-500/30 text-red-400" },
    { key: "plate20kg", label: "20 kg Plates", accent: "border-blue-500/30 text-blue-400" },
    { key: "plate15kg", label: "15 kg Plates", accent: "border-yellow-500/30 text-yellow-400" },
    { key: "plate10kg", label: "10 kg Plates", accent: "border-green-500/30 text-green-400" },
    { key: "plate5kg", label: "5 kg Plates", accent: "border-slate-500/30 text-slate-100" },
    { key: "plate2_5kg", label: "2.5 kg Plates", accent: "border-slate-500/30 text-slate-300" },
    { key: "plate1_25kg", label: "1.25 kg Plates", accent: "border-slate-500/30 text-slate-400" },
  ] as const;

  const updatePlateCount = (plateKey: keyof PlateInventory, increment: number) => {
    setInventory((prev) => ({
      ...prev,
      [plateKey]: Math.max(0, prev[plateKey] + increment),
    }));
  };

  // 2. Push updates to the database
  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveInventory(inventory);
    } catch (error) {
      console.error("Failed to save inventory:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto flex items-center justify-center h-64">
        <p className="text-slate-500 animate-pulse tracking-widest text-sm font-semibold">LOADING GYM BAG...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <header className="border-b border-slate-800 pb-6">
        <h1 className="text-2xl font-semibold text-slate-100">Equipment Inventory</h1>
        <p className="text-slate-400 mt-1 text-sm">
          Configure your available plates so the Barbell Calculator knows exactly what you have.
        </p>
      </header>

      <div className="bg-[#111111] p-6 rounded-xl border border-slate-800 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {plateConfig.map((plate) => (
            <div key={plate.key} className="flex items-center justify-between p-4 bg-[#0A0A0A] border border-slate-800/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-8 rounded-sm border-2 bg-slate-900 ${plate.accent}`} />
                <span className="text-sm font-semibold text-slate-200">{plate.label}</span>
              </div>
              
              <div className="flex items-center gap-4 bg-slate-900 rounded-lg border border-slate-800">
                <button 
                  onClick={() => updatePlateCount(plate.key, -2)}
                  className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" /></svg>
                </button>
                
                <span className="text-base font-bold text-slate-100 w-4 text-center">
                  {inventory[plate.key]}
                </span>
                
                <button 
                  onClick={() => updatePlateCount(plate.key, 2)}
                  className="p-2 text-slate-400 hover:text-emerald-400 transition-colors"
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
            className="w-full bg-emerald-500 text-slate-950 font-bold text-sm tracking-wide py-4 rounded-lg hover:bg-emerald-400 transition-colors disabled:opacity-50 flex justify-center items-center"
          >
            {isSaving ? "SYNCING TO CLOUD..." : "SAVE INVENTORY SETTINGS"}
          </button>
        </div>
      </div>
    </div>
  );
}