export enum ActionState {
  IDLE = 'IDLE',
  MINING = 'MINING',
  RESPAWNING = 'RESPAWNING',
}

export interface Ore {
  id: string;
  name: string;
  levelReq: number;
  baseInterval: number; // Seconds
  respawnInterval: number; // Seconds
  baseHp: number;
  xp: number;
  value: number;
  color: string; // Tailwind class equivalent or hex
}

export interface Pickaxe {
  id: string;
  name: string;
  reduction: number; // 0.1 = 10% reduction
  cost: number;
  description: string;
}

export interface GameState {
  xp: number;
  level: number;
  gold: number;
  inventory: Record<string, number>;
  ownedPickaxes: string[];
  equippedPickaxeId: string;
  
  // Active Session State
  activeOreId: string | null;
  actionState: ActionState;
  currentRockHp: number;
  actionStartTime: number; // Timestamp
  actionDuration: number; // ms
}
