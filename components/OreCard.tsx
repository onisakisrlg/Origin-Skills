import React from 'react';
import { Ore } from '../types';
import { Lock, Clock, Database } from 'lucide-react';
import { OreIcon } from './OreIcons';

interface OreCardProps {
  ore: Ore;
  localizedName: string;
  isUnlocked: boolean;
  isActive: boolean;
  onSelect: (ore: Ore) => void;
  labels: {
    locked: string;
    active: string;
    sec: string;
    hp: string;
    xp: string;
    val: string;
  };
}

const OreCard: React.FC<OreCardProps> = ({ ore, localizedName, isUnlocked, isActive, onSelect, labels }) => {
  if (!isUnlocked) {
    return (
      <div className="relative bg-slate-900 border border-slate-700 rounded-lg p-4 flex flex-col items-center justify-center opacity-70 grayscale h-full min-h-[140px]">
        <Lock className="w-8 h-8 text-slate-500 mb-2" />
        <h3 className="text-slate-500 font-bold">Level {ore.levelReq}</h3>
        <p className="text-xs text-slate-600">{labels.locked}</p>
      </div>
    );
  }

  return (
    <button
      onClick={() => onSelect(ore)}
      className={`relative group flex flex-col items-start p-4 rounded-lg border-2 transition-all w-full text-left h-full
        ${isActive 
          ? 'bg-slate-800 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
          : 'bg-slate-800 border-slate-700 hover:border-slate-500 hover:bg-slate-750'
        }
      `}
    >
      <div className="flex items-start justify-between w-full mb-3">
        <div className="flex items-center gap-3">
             <div className="bg-slate-900/50 p-2 rounded-lg border border-slate-700/50">
                <OreIcon id={ore.id} className="w-10 h-10" />
             </div>
            <h3 className={`font-bold text-lg ${ore.color} leading-tight`}>{localizedName}</h3>
        </div>
        {isActive && (
            <span className="flex items-center text-[10px] bg-emerald-500 text-slate-900 px-2 py-0.5 rounded-full font-bold animate-pulse">
                {labels.active}
            </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs text-slate-400 w-full mt-auto">
        <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-slate-500" />
            <span>{ore.baseInterval}{labels.sec}</span>
        </div>
        <div className="flex items-center gap-1.5">
            <Database size={14} className="text-slate-500" />
            <span>{ore.baseHp} {labels.hp}</span>
        </div>
        <div className="flex items-center gap-1.5 text-cyan-400 font-medium">
             <span className="opacity-70">{labels.xp}:</span> <span>{ore.xp}</span>
        </div>
         <div className="flex items-center gap-1.5 text-yellow-500 font-medium">
            <span className="opacity-70">{labels.val}:</span> <span>{ore.value}</span>
        </div>
      </div>
    </button>
  );
};

export default OreCard;