import React, { useState, useEffect, useRef } from 'react';
import { ActionState, GameState, Ore } from './types';
import { ORES, PICKAXES, getXPForLevel, getLevelFromXP } from './constants';
import ProgressBar from './components/ProgressBar';
import OreCard from './components/OreCard';
import { OreIcon } from './components/OreIcons';
import { Pickaxe, Coins, Zap, Trophy, Menu, ArrowUpCircle, Hammer, Languages } from 'lucide-react';
import { TRANSLATIONS, Language } from './translations';

const SAVE_KEY = 'MYSTIC_MINES_SAVE_V1';

const INITIAL_STATE: GameState = {
  xp: 0,
  level: 1,
  gold: 0,
  inventory: {},
  ownedPickaxes: ['bronze'],
  equippedPickaxeId: 'bronze',
  activeOreId: null,
  actionState: ActionState.IDLE,
  currentRockHp: 0,
  actionStartTime: 0,
  actionDuration: 0,
};

const TICK_RATE = 50; // ms

function App() {
  // --- State ---
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [activeTab, setActiveTab] = useState<'mining' | 'shop'>('mining');
  const [language, setLanguage] = useState<Language>('zh');
  
  // Visual progress state
  const [visualProgress, setVisualProgress] = useState(0);

  // Refs
  const stateRef = useRef(gameState);
  
  useEffect(() => {
    stateRef.current = gameState;
  }, [gameState]);

  // --- Persistence ---
  useEffect(() => {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setGameState({ ...INITIAL_STATE, ...parsed });
      } catch (e) {
        console.error("Failed to load save", e);
      }
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem(SAVE_KEY, JSON.stringify(stateRef.current));
    }, 10000); // Auto-save
    return () => clearInterval(interval);
  }, []);

  // --- Core Game Loop ---
  useEffect(() => {
    const loop = setInterval(() => {
      const now = Date.now();
      const state = stateRef.current;

      if (state.actionState === ActionState.IDLE || !state.activeOreId) {
        setVisualProgress(0);
        return;
      }

      // Calculate Progress
      const elapsed = now - state.actionStartTime;
      const progress = Math.min((elapsed / state.actionDuration) * 100, 100);
      setVisualProgress(progress);

      // Check for Completion
      if (elapsed >= state.actionDuration) {
        handleTickComplete(state);
      }

    }, TICK_RATE);

    return () => clearInterval(loop);
  }, []);

  const handleTickComplete = (currentState: GameState) => {
    const ore = ORES.find(o => o.id === currentState.activeOreId);
    if (!ore) return;

    const newState = { ...currentState };
    const now = Date.now();

    if (currentState.actionState === ActionState.MINING) {
        // --- Mining Complete ---
        const currentAmt = newState.inventory[ore.id] || 0;
        newState.inventory[ore.id] = currentAmt + 1;

        newState.xp += ore.xp;
        const newLevel = getLevelFromXP(newState.xp);
        if (newLevel > newState.level) {
            newState.level = newLevel;
        }

        newState.currentRockHp -= 1;

        if (newState.currentRockHp <= 0) {
            newState.actionState = ActionState.RESPAWNING;
            newState.actionDuration = ore.respawnInterval * 1000;
            newState.actionStartTime = now;
        } else {
            const pickaxe = PICKAXES.find(p => p.id === newState.equippedPickaxeId) || PICKAXES[0];
            const reduction = pickaxe.reduction;
            const duration = (ore.baseInterval * (1 - reduction)) * 1000;
            
            newState.actionState = ActionState.MINING;
            newState.actionDuration = duration;
            newState.actionStartTime = now;
        }

    } else if (currentState.actionState === ActionState.RESPAWNING) {
        // --- Respawn Complete ---
        newState.currentRockHp = ore.baseHp;
        
        const pickaxe = PICKAXES.find(p => p.id === newState.equippedPickaxeId) || PICKAXES[0];
        const reduction = pickaxe.reduction;
        const duration = (ore.baseInterval * (1 - reduction)) * 1000;

        newState.actionState = ActionState.MINING;
        newState.actionDuration = duration;
        newState.actionStartTime = now;
    }

    setGameState(newState);
  };

  // --- Actions ---

  const selectOre = (ore: Ore) => {
    if (ore.levelReq > gameState.level) return;

    const pickaxe = PICKAXES.find(p => p.id === gameState.equippedPickaxeId) || PICKAXES[0];
    const duration = (ore.baseInterval * (1 - pickaxe.reduction)) * 1000;

    setGameState(prev => ({
        ...prev,
        activeOreId: ore.id,
        actionState: ActionState.MINING,
        currentRockHp: ore.baseHp,
        actionStartTime: Date.now(),
        actionDuration: duration
    }));
    setVisualProgress(0);
  };

  const buyPickaxe = (pickaxe: typeof PICKAXES[0]) => {
    if (gameState.gold >= pickaxe.cost && !gameState.ownedPickaxes.includes(pickaxe.id)) {
        setGameState(prev => ({
            ...prev,
            gold: prev.gold - pickaxe.cost,
            ownedPickaxes: [...prev.ownedPickaxes, pickaxe.id],
            equippedPickaxeId: pickaxe.id
        }));
    }
  };

  const equipPickaxe = (id: string) => {
      if (gameState.ownedPickaxes.includes(id)) {
          setGameState(prev => ({...prev, equippedPickaxeId: id}));
      }
  };

  const sellOres = (oreId: string) => {
      const amount = gameState.inventory[oreId] || 0;
      if (amount <= 0) return;
      
      const ore = ORES.find(o => o.id === oreId);
      if(!ore) return;

      const value = amount * ore.value;

      setGameState(prev => ({
          ...prev,
          inventory: {
              ...prev.inventory,
              [oreId]: 0
          },
          gold: prev.gold + value
      }));
  };

  // --- Translation Helper ---
  const t = (key: keyof typeof TRANSLATIONS['zh']) => {
    return TRANSLATIONS[language][key] || key;
  };
  
  const getOreName = (id: string) => {
      // @ts-ignore
      return t(`ore_${id}`) || id;
  }

  const getPickaxeName = (id: string) => {
      // @ts-ignore
      return t(`pick_${id}`) || id;
  }
  
  const getPickaxeDesc = (id: string) => {
      // @ts-ignore
      return t(`pick_${id}_desc`) || "";
  }

  // --- Render Helpers ---

  const currentOre = ORES.find(o => o.id === gameState.activeOreId);
  const nextLevelXP = getXPForLevel(gameState.level + 1);
  const currentLevelXP = getXPForLevel(gameState.level);
  const xpProgress = ((gameState.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
  
  const currentPickaxe = PICKAXES.find(p => p.id === gameState.equippedPickaxeId) || PICKAXES[0];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans flex flex-col md:flex-row max-w-7xl mx-auto shadow-2xl overflow-hidden">
      
      {/* Sidebar / Mobile Nav */}
      <nav className="bg-slate-950 p-4 md:w-64 md:flex-shrink-0 flex md:flex-col justify-around md:justify-start gap-4 border-r border-slate-800 z-10">
        <div className="hidden md:flex items-center gap-2 mb-4 text-emerald-400">
            <Pickaxe className="w-8 h-8" />
            <h1 className="text-xl font-bold tracking-wider">{t('appTitle')}</h1>
        </div>
        
        <button 
            onClick={() => setActiveTab('mining')}
            className={`flex items-center gap-3 p-3 rounded-lg transition-all ${activeTab === 'mining' ? 'bg-emerald-900/50 text-emerald-400' : 'hover:bg-slate-800'}`}
        >
            <Pickaxe size={20} />
            <span className="font-semibold">{t('tabExcavate')}</span>
        </button>

        <button 
             onClick={() => setActiveTab('shop')}
            className={`flex items-center gap-3 p-3 rounded-lg transition-all ${activeTab === 'shop' ? 'bg-amber-900/50 text-amber-400' : 'hover:bg-slate-800'}`}
        >
            <ArrowUpCircle size={20} />
            <span className="font-semibold">{t('tabUpgrade')}</span>
        </button>

        <div className="md:mt-auto pt-4 border-t border-slate-800 flex flex-col gap-4">
             {/* Language Switcher */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs text-slate-500 uppercase tracking-widest font-bold">
                    <Languages size={12} />
                    Language
                </div>
                <div className="grid grid-cols-3 gap-1">
                    <button 
                        onClick={() => setLanguage('zh')} 
                        className={`text-xs p-1 rounded border ${language === 'zh' ? 'bg-slate-700 border-slate-500 text-white' : 'border-slate-800 text-slate-500 hover:bg-slate-800'}`}
                    >
                        中文
                    </button>
                     <button 
                        onClick={() => setLanguage('ja')} 
                        className={`text-xs p-1 rounded border ${language === 'ja' ? 'bg-slate-700 border-slate-500 text-white' : 'border-slate-800 text-slate-500 hover:bg-slate-800'}`}
                    >
                        日本語
                    </button>
                     <button 
                        onClick={() => setLanguage('en')} 
                        className={`text-xs p-1 rounded border ${language === 'en' ? 'bg-slate-700 border-slate-500 text-white' : 'border-slate-800 text-slate-500 hover:bg-slate-800'}`}
                    >
                        EN
                    </button>
                </div>
            </div>

            <div className="text-xs text-slate-500 text-center">{t('version')}</div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-[calc(100vh-60px)] md:h-screen overflow-hidden relative">
        
        {/* Top Sticky Stats Bar */}
        <header className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 p-4 sticky top-0 z-20 shadow-md">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                {/* Level */}
                <div className="flex items-center gap-2">
                    <div className="bg-slate-800 p-2 rounded-lg border border-slate-600">
                        <Trophy size={18} className="text-cyan-400" />
                    </div>
                    <div>
                        <div className="text-xs text-slate-400">{t('miningLevel')}</div>
                        <div className="font-bold text-lg leading-none">{gameState.level} <span className="text-slate-500 text-xs">/ 120</span></div>
                    </div>
                </div>

                {/* XP Bar */}
                <div className="col-span-2 hidden md:block">
                     <ProgressBar 
                        percentage={xpProgress} 
                        label={t('experience')} 
                        subLabel={`${Math.floor(gameState.xp).toLocaleString()} / ${nextLevelXP.toLocaleString()}`}
                        heightClass="h-3"
                        colorClass="bg-cyan-500"
                        showText={false}
                     />
                </div>

                 {/* Gold */}
                 <div className="flex items-center gap-2 justify-end">
                    <div className="text-right">
                        <div className="text-xs text-slate-400">{t('goldCoins')}</div>
                        <div className="font-bold text-amber-400 text-lg leading-none">{gameState.gold.toLocaleString()}</div>
                    </div>
                    <div className="bg-slate-800 p-2 rounded-full border border-amber-600/30">
                        <Coins size={18} className="text-amber-400" />
                    </div>
                </div>
            </div>
            {/* Mobile XP Bar */}
            <div className="mt-4 md:hidden">
                 <ProgressBar 
                    percentage={xpProgress} 
                    heightClass="h-1.5"
                    colorClass="bg-cyan-500"
                    showText={false}
                 />
            </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 pb-32 custom-scrollbar">
            
            {activeTab === 'mining' && (
                <div className="max-w-4xl mx-auto">
                    {/* Active Mining Area */}
                    <div className="bg-slate-800 rounded-xl p-6 mb-8 border border-slate-700 shadow-lg relative overflow-hidden">
                        
                        {/* Status Header */}
                        <div className="flex justify-between items-start mb-6 z-10 relative">
                             <div>
                                <h2 className="text-2xl font-bold text-white mb-1">
                                    {currentOre ? getOreName(currentOre.id) : t('selectRock')}
                                </h2>
                                <p className="text-slate-400 text-sm flex items-center gap-2">
                                    <Hammer size={14} />
                                    {getPickaxeName(currentPickaxe.id)} ({(currentPickaxe.reduction * 100).toFixed(0)}% {t('faster')})
                                </p>
                             </div>
                             {currentOre && (
                                 <div className={`px-3 py-1 rounded-full text-xs font-bold border ${
                                     gameState.actionState === ActionState.MINING 
                                     ? 'bg-emerald-900/30 text-emerald-400 border-emerald-500/30' 
                                     : 'bg-amber-900/30 text-amber-400 border-amber-500/30'
                                 }`}>
                                     {gameState.actionState === ActionState.MINING ? t('miningState') : t('respawningState')}
                                 </div>
                             )}
                        </div>

                        {/* Visual Representation */}
                        <div className="flex flex-col items-center justify-center py-4 z-10 relative min-h-[120px]">
                            {currentOre ? (
                                <>
                                    <div className={`transition-all duration-300 transform ${gameState.actionState === ActionState.MINING ? 'scale-100 opacity-100' : 'scale-90 opacity-50 grayscale'}`}>
                                        <div className="filter drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                                            <OreIcon id={currentOre.id} className="w-32 h-32" />
                                        </div>
                                    </div>
                                    <div className="mt-4 text-sm font-mono text-slate-400">
                                        {t('rockDurability')}: <span className="text-white">{gameState.currentRockHp}</span> / {currentOre.baseHp}
                                    </div>
                                </>
                            ) : (
                                <div className="text-slate-600 italic">{t('selectRockDesc')}</div>
                            )}
                        </div>

                        {/* Progress Bar Area */}
                        <div className="mt-6 z-10 relative">
                            {currentOre && (
                                <ProgressBar 
                                    percentage={visualProgress} 
                                    label={gameState.actionState === ActionState.MINING ? t('miningProgress') : t('rockRegenerating')}
                                    colorClass={gameState.actionState === ActionState.MINING ? 'bg-emerald-500' : 'bg-amber-500'}
                                    heightClass="h-6"
                                />
                            )}
                        </div>
                    </div>

                    {/* Ore Grid */}
                    <h3 className="text-slate-400 font-bold uppercase text-xs tracking-wider mb-4">{t('availableDeposits')}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {ORES.map(ore => (
                            <OreCard 
                                key={ore.id} 
                                ore={ore} 
                                localizedName={getOreName(ore.id)}
                                isUnlocked={gameState.level >= ore.levelReq}
                                isActive={gameState.activeOreId === ore.id}
                                onSelect={selectOre}
                                labels={{
                                    locked: t('locked'),
                                    active: t('active'),
                                    sec: t('sec'),
                                    hp: "HP",
                                    xp: t('xp'),
                                    val: t('val')
                                }}
                            />
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'shop' && (
                <div className="max-w-3xl mx-auto space-y-6">
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <Menu className="text-amber-400" />
                            {t('marketplace')}
                        </h2>
                        <p className="text-slate-400 mb-6">{t('sellDesc')}</p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                             {ORES.map(ore => {
                                 const count = gameState.inventory[ore.id] || 0;
                                 if (count === 0 && gameState.level < ore.levelReq) return null; // Hide future ores
                                 return (
                                     <div key={ore.id} className="flex items-center justify-between bg-slate-900 p-3 rounded border border-slate-700">
                                         <div className="flex items-center gap-3">
                                             <div className="bg-slate-800 p-1 rounded">
                                                <OreIcon id={ore.id} className="w-8 h-8" />
                                             </div>
                                             <div>
                                                 <div className="font-bold">{getOreName(ore.id)}</div>
                                                 <div className="text-xs text-slate-500">{t('owned')}: {count}</div>
                                             </div>
                                         </div>
                                         <button 
                                            onClick={() => sellOres(ore.id)}
                                            disabled={count === 0}
                                            className="px-3 py-1 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 disabled:bg-slate-700 rounded text-xs font-bold transition-colors"
                                         >
                                             {t('sellAll')} ({count * ore.value})
                                         </button>
                                     </div>
                                 )
                             })}
                        </div>
                    </div>

                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <Zap className="text-purple-400" />
                            {t('equipmentShop')}
                        </h2>
                         <div className="space-y-4">
                            {PICKAXES.map((pick, index) => {
                                const isOwned = gameState.ownedPickaxes.includes(pick.id);
                                const isEquipped = gameState.equippedPickaxeId === pick.id;
                                const canAfford = gameState.gold >= pick.cost;
                                const prevPick = PICKAXES[index - 1];
                                const isLocked = prevPick && !gameState.ownedPickaxes.includes(prevPick.id);

                                return (
                                    <div key={pick.id} className={`p-4 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${isEquipped ? 'bg-slate-700/50 border-emerald-500' : 'bg-slate-900 border-slate-700'}`}>
                                        <div>
                                            <h3 className="font-bold text-lg text-white">{getPickaxeName(pick.id)}</h3>
                                            <p className="text-slate-400 text-sm">{getPickaxeDesc(pick.id)}</p>
                                            <p className="text-emerald-400 text-xs mt-1">{t('miningSpeed')}: +{(pick.reduction * 100).toFixed(0)}%</p>
                                        </div>
                                        
                                        <div className="flex items-center gap-4">
                                            {!isOwned && (
                                                 <div className="text-amber-400 font-mono font-bold">
                                                     {pick.cost.toLocaleString()} G
                                                 </div>
                                            )}

                                            {isOwned ? (
                                                <button 
                                                    onClick={() => equipPickaxe(pick.id)}
                                                    disabled={isEquipped}
                                                    className={`px-4 py-2 rounded font-bold text-sm ${isEquipped ? 'bg-emerald-600 text-white cursor-default' : 'bg-slate-600 hover:bg-slate-500 text-slate-200'}`}
                                                >
                                                    {isEquipped ? t('equipped') : t('equip')}
                                                </button>
                                            ) : (
                                                <button 
                                                    onClick={() => buyPickaxe(pick)}
                                                    disabled={!canAfford || isLocked}
                                                    className="px-4 py-2 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 disabled:bg-slate-700 rounded font-bold text-sm text-white"
                                                >
                                                    {isLocked ? t('locked') : t('buy')}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                         </div>
                    </div>
                </div>
            )}
        </div>

      </main>
    </div>
  );
}

export default App;