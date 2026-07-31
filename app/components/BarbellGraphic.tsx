"use client";

interface BarbellGraphicProps {
  plates: number[];
}

export default function BarbellGraphic({ plates }: BarbellGraphicProps) {
  // Powerlifting color standards for plates
  const getPlateStyles = (weight: number) => {
    switch (weight) {
      case 25: return "h-32 w-6 bg-red-600 border-red-800";
      case 20: return "h-32 w-5 bg-blue-600 border-blue-800";
      case 15: return "h-28 w-4 bg-yellow-500 border-yellow-700";
      case 10: return "h-24 w-4 bg-emerald-600 border-emerald-800";
      case 5: return "h-16 w-3 bg-slate-200 border-slate-400";
      case 2.5: return "h-12 w-2 bg-slate-800 border-slate-950";
      case 1.25: return "h-10 w-2 bg-slate-800 border-slate-950";
      default: return "h-24 w-4 bg-slate-600 border-slate-800";
    }
  };

  return (
    <div className="flex items-center justify-start overflow-x-auto p-8 bg-[#0A0A0A] rounded-xl border border-slate-800 w-full">
      
      {/* The Barbell Shaft (Inner part where you grip) */}
      <div className="h-5 w-24 bg-slate-400 rounded-l-md border-y border-l border-slate-500 relative shrink-0">
         {/* Grip Knurling Texture */}
         <div className="absolute inset-0 opacity-30 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,#000_2px,#000_3px)] rounded-l-md"></div>
      </div>

      {/* The Collar (Stops the plates from sliding inside) */}
      <div className="h-10 w-4 bg-slate-300 border border-slate-500 rounded-sm z-10 shrink-0 shadow-lg"></div>

      {/* The Plates (Dynamically rendered based on the algorithm array) */}
      <div className="flex items-center space-x-0.5 ml-1 z-20">
        {plates.map((weight, index) => (
          <div
            key={index}
            className={`${getPlateStyles(weight)} rounded-sm shadow-xl flex items-center justify-center border-2 shrink-0 relative group`}
          >
            {/* Tooltip on hover so the user knows exactly what plate it is */}
            <div className="absolute -top-10 bg-slate-800 text-slate-100 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30">
              {weight} kg
            </div>
          </div>
        ))}
        {plates.length === 0 && (
          <span className="text-slate-600 text-xs ml-4 font-medium tracking-wide">EMPTY BAR</span>
        )}
      </div>
      
      {/* The Sleeve (The end of the bar extending outward) */}
      <div className="h-4 w-20 bg-slate-400 rounded-r-md border-y border-r border-slate-500 shrink-0"></div>
    </div>
  );
}