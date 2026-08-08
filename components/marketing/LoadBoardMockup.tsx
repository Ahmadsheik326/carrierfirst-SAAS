"use client";

import { MapPin, Calendar, Search, Filter, Bookmark, CheckCircle2, ArrowRight, Star } from "lucide-react";

const loads = [
  { origin: "Dallas, TX", dest: "Atlanta, GA", distance: "724 mi", rate: "$2,850", weight: "42,000 lbs", type: "Van", company: "Swift Transport", rating: 4.8, age: "2m" },
  { origin: "Chicago, IL", dest: "Denver, CO", distance: "920 mi", rate: "$3,400", weight: "38,000 lbs", type: "Reefer", company: "J.B. Hunt", rating: 4.9, age: "5m" },
  { origin: "Phoenix, AZ", dest: "Seattle, WA", distance: "1,420 mi", rate: "$4,100", weight: "45,000 lbs", type: "Flatbed", company: "Schneider", rating: 4.7, age: "12m" },
  { origin: "Miami, FL", dest: "Charlotte, NC", distance: "650 mi", rate: "$2,200", weight: "36,000 lbs", type: "Van", company: "Landstar", rating: 4.8, age: "18m" },
  { origin: "Houston, TX", dest: "Los Angeles, CA", distance: "1,540 mi", rate: "$4,750", weight: "43,000 lbs", type: "Reefer", company: "Prime Inc", rating: 4.9, age: "25m" },
];

export default function LoadBoardMockup() {
  return (
    <div className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 bg-[#111118]">
      <div className="bg-[#16161f] border-b border-white/10 px-4 py-3 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="ml-4 flex items-center gap-2 text-xs text-white/30">
          <div className="w-4 h-4 rounded bg-[#c9a96e]/20 flex items-center justify-center">
            <div className="w-2 h-2 rounded-sm bg-[#c9a96e]" />
          </div>
          <span className="font-medium text-white/50">Carrier First</span>
          <span>/</span>
          <span>Load Board</span>
        </div>
      </div>

      <div className="bg-[#111118] border-b border-white/10 px-4 py-3">
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-2 bg-[#16161f] border border-white/10 rounded-lg px-3 py-2 flex-1 min-w-[140px]">
            <MapPin className="w-4 h-4 text-[#c9a96e]" />
            <span className="text-xs text-white/40">Origin</span>
            <span className="text-xs text-white font-medium ml-auto">Dallas, TX</span>
          </div>
          <div className="flex items-center gap-2 bg-[#16161f] border border-white/10 rounded-lg px-3 py-2 flex-1 min-w-[140px]">
            <MapPin className="w-4 h-4 text-[#c9a96e]" />
            <span className="text-xs text-white/40">Destination</span>
            <span className="text-xs text-white font-medium ml-auto">Anywhere</span>
          </div>
          <div className="flex items-center gap-2 bg-[#16161f] border border-white/10 rounded-lg px-3 py-2 flex-1 min-w-[120px]">
            <Calendar className="w-4 h-4 text-[#c9a96e]" />
            <span className="text-xs text-white/40">Date</span>
            <span className="text-xs text-white font-medium ml-auto">Today</span>
          </div>
          <button className="flex items-center gap-2 bg-[#c9a96e] hover:bg-[#b8945f] text-[#0a0a0f] rounded-lg px-4 py-2 transition-colors">
            <Search className="w-4 h-4" />
            <span className="text-xs font-bold">Search</span>
          </button>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <button className="flex items-center gap-1.5 text-[10px] text-white/30 hover:text-white/50 transition-colors">
            <Filter className="w-3 h-3" /> Filters
          </button>
          <button className="flex items-center gap-1.5 text-[10px] text-white/30 hover:text-white/50 transition-colors">
            <Bookmark className="w-3 h-3" /> Saved (3)
          </button>
          <span className="text-[10px] text-white/30 ml-auto">302,348 loads available</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#16161f] border-b border-white/10">
              {["Age", "Route", "Distance", "Rate", "Weight", "Type", "Company", "Action"].map((h) => (
                <th key={h} className="px-3 py-2.5 text-[10px] font-bold text-white/40 uppercase tracking-wider whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loads.map((load, i) => (
              <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                <td className="px-3 py-3 whitespace-nowrap">
                  <span className="text-[10px] text-white/30">{load.age}</span>
                </td>
                <td className="px-3 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-white font-medium">{load.origin}</span>
                    <ArrowRight className="w-3 h-3 text-[#c9a96e]" />
                    <span className="text-xs text-white font-medium">{load.dest}</span>
                  </div>
                </td>
                <td className="px-3 py-3 whitespace-nowrap">
                  <span className="text-xs text-white/50">{load.distance}</span>
                </td>
                <td className="px-3 py-3 whitespace-nowrap">
                  <span className="text-xs font-bold text-[#c9a96e]">{load.rate}</span>
                </td>
                <td className="px-3 py-3 whitespace-nowrap">
                  <span className="text-xs text-white/50">{load.weight}</span>
                </td>
                <td className="px-3 py-3 whitespace-nowrap">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-white/5 text-white/50 border border-white/10">
                    {load.type}
                  </span>
                </td>
                <td className="px-3 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-white">{load.company}</span>
                    <div className="flex items-center gap-0.5">
                      <Star className="w-3 h-3 text-[#c9a96e] fill-[#c9a96e]" />
                      <span className="text-[10px] text-white/30">{load.rating}</span>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3 whitespace-nowrap">
                  <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-[#c9a96e]/10 border border-[#c9a96e]/20 text-[#c9a96e] text-[10px] font-bold hover:bg-[#c9a96e]/20 transition-colors group-hover:border-[#c9a96e]/40">
                    <CheckCircle2 className="w-3 h-3" /> Book
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
