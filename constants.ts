import { Ore, Pickaxe } from './types';

// --- Leveling Curve ---
// Simple exponential-ish curve.
// XP needed for level L = Floor(Base * (Growth ^ L))
export const getLevelFromXP = (xp: number): number => {
  let level = 1;
  while (getXPForLevel(level + 1) <= xp) {
    level++;
  }
  return level;
};

export const getXPForLevel = (level: number): number => {
  if (level === 1) return 0;
  // A simplified Runescape-like curve logic
  let points = 0;
  for (let lvl = 1; lvl < level; lvl++) {
    points += Math.floor(lvl + 300 * Math.pow(2, lvl / 7));
  }
  return Math.floor(points / 4);
};

// --- Ores Data ---
export const ORES: Ore[] = [
  // T1 - T4 (Base)
  { id: 'copper', name: 'Copper Ore', levelReq: 1, baseInterval: 3.0, respawnInterval: 2, baseHp: 3, xp: 10, value: 5, color: 'text-orange-400' },
  { id: 'tin', name: 'Tin Ore', levelReq: 1, baseInterval: 3.0, respawnInterval: 2, baseHp: 3, xp: 10, value: 5, color: 'text-stone-400' },
  { id: 'iron', name: 'Iron Ore', levelReq: 15, baseInterval: 3.5, respawnInterval: 3, baseHp: 5, xp: 25, value: 15, color: 'text-slate-400' },
  { id: 'coal', name: 'Dense Coal', levelReq: 30, baseInterval: 4.0, respawnInterval: 3, baseHp: 8, xp: 40, value: 35, color: 'text-stone-800' },
  { id: 'silver', name: 'Silver Ore', levelReq: 40, baseInterval: 5.0, respawnInterval: 5, baseHp: 6, xp: 60, value: 80, color: 'text-gray-300' },
  { id: 'gold', name: 'Gold Ore', levelReq: 50, baseInterval: 6.0, respawnInterval: 8, baseHp: 5, xp: 85, value: 150, color: 'text-yellow-400' },
  
  // T5 - T8 (Advanced)
  { id: 'mithril', name: 'Mithril Ore', levelReq: 60, baseInterval: 5.5, respawnInterval: 6, baseHp: 15, xp: 110, value: 200, color: 'text-blue-700' },
  { id: 'adamant', name: 'Adamantite', levelReq: 70, baseInterval: 6.5, respawnInterval: 8, baseHp: 25, xp: 160, value: 350, color: 'text-green-700' },
  { id: 'rune', name: 'Runite Ore', levelReq: 85, baseInterval: 8.0, respawnInterval: 12, baseHp: 40, xp: 250, value: 600, color: 'text-cyan-400' },
  { id: 'dragon', name: 'Draconium', levelReq: 95, baseInterval: 10.0, respawnInterval: 15, baseHp: 60, xp: 450, value: 1200, color: 'text-red-600' },

  // T9 - T12 (TotH / Void)
  { id: 'corundum', name: 'Corundum', levelReq: 100, baseInterval: 9.0, respawnInterval: 10, baseHp: 100, xp: 800, value: 2500, color: 'text-pink-500' },
  { id: 'augite', name: 'Augite', levelReq: 105, baseInterval: 11.0, respawnInterval: 12, baseHp: 150, xp: 1200, value: 4000, color: 'text-yellow-200' },
  { id: 'iridium', name: 'Iridium', levelReq: 110, baseInterval: 12.0, respawnInterval: 15, baseHp: 200, xp: 1800, value: 6500, color: 'text-indigo-400' },
  { id: 'palladium', name: 'Palladium', levelReq: 115, baseInterval: 14.0, respawnInterval: 20, baseHp: 300, xp: 2500, value: 9000, color: 'text-purple-500' },
];

// --- Pickaxes Data ---
export const PICKAXES: Pickaxe[] = [
  { id: 'bronze', name: 'Bronze Pickaxe', reduction: 0.0, cost: 0, description: 'Basic rusty tool.' },
  { id: 'iron', name: 'Iron Pickaxe', reduction: 0.05, cost: 150, description: 'Slightly faster.' },
  { id: 'steel', name: 'Steel Pickaxe', reduction: 0.10, cost: 500, description: 'Reliable industry standard.' },
  { id: 'mithril', name: 'Mithril Pickaxe', reduction: 0.15, cost: 2000, description: 'Lightweight and sharp.' },
  { id: 'adamant', name: 'Adamant Pickaxe', reduction: 0.20, cost: 8000, description: 'Harder than steel.' },
  { id: 'rune', name: 'Rune Pickaxe', reduction: 0.25, cost: 30000, description: 'Infused with magical properties.' },
  { id: 'dragon', name: 'Dragon Pickaxe', reduction: 0.35, cost: 150000, description: 'Forged in dragon fire.' },
  
  // High Tier
  { id: 'crystal', name: 'Crystal Pickaxe', reduction: 0.45, cost: 1000000, description: 'Resonates with the earth.' },
  { id: 'augite', name: 'Augite Drill', reduction: 0.55, cost: 5000000, description: 'Pierces through reality.' },
  { id: 'divine', name: 'Divine Sunderer', reduction: 0.70, cost: 50000000, description: 'A tool of the gods.' },
];
