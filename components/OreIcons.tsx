import React from 'react';

interface IconProps {
  className?: string;
}

const CopperIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 42L4 32L14 18L28 22L32 38L22 48L12 42Z" fill="#B45F06" stroke="#783F04" strokeWidth="2" />
    <path d="M32 38L48 30L56 42L44 54L28 50L32 38Z" fill="#D68227" stroke="#783F04" strokeWidth="2" />
    <path d="M28 22L36 8L52 12L58 28L48 30L32 38L28 22Z" fill="#E69138" stroke="#783F04" strokeWidth="2" />
  </svg>
);

const TinIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="12" y="24" width="24" height="24" rx="2" transform="rotate(-10 12 24)" fill="#A8A29E" stroke="#57534E" strokeWidth="2" />
    <rect x="32" y="14" width="20" height="20" rx="2" transform="rotate(15 32 14)" fill="#D6D3D1" stroke="#57534E" strokeWidth="2" />
  </svg>
);

const IronIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M32 4L56 20V44L32 60L8 44V20L32 4Z" fill="#64748B" stroke="#334155" strokeWidth="2" />
    <path d="M32 4V60M8 20L56 44M56 20L8 44" stroke="#334155" strokeWidth="2" strokeOpacity="0.5" />
  </svg>
);

const CoalIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="20" cy="40" r="14" fill="#292524" />
    <circle cx="44" cy="40" r="12" fill="#1C1917" />
    <circle cx="32" cy="22" r="14" fill="#44403C" />
    <path d="M24 24L28 28" stroke="#57534E" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const SilverIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M32 4L42 22L62 32L42 42L32 60L22 42L2 32L22 22L32 4Z" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
    <path d="M32 4L32 60M2 32L62 32" stroke="#CBD5E1" strokeWidth="1" />
  </svg>
);

const GoldIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M10 32C10 20 20 12 32 12C44 12 54 20 54 32C54 44 44 52 32 52C20 52 10 44 10 32Z" fill="#FACC15" stroke="#A16207" strokeWidth="2" />
    <ellipse cx="24" cy="26" rx="4" ry="6" fill="#FEF08A" transform="rotate(-30 24 26)" />
    <path d="M32 12V52" stroke="#CA8A04" strokeWidth="1" strokeOpacity="0.5" />
  </svg>
);

const MithrilIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M32 2L42 22L52 8L48 28L62 32L48 36L52 56L42 42L32 62L22 42L12 56L16 36L2 32L16 28L12 8L22 22L32 2Z" fill="#1D4ED8" stroke="#1E3A8A" strokeWidth="2" />
    <circle cx="32" cy="32" r="4" fill="#93C5FD" />
  </svg>
);

const AdamantIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M16 16H48V48H16V16Z" fill="#15803D" stroke="#14532D" strokeWidth="2" />
    <path d="M8 8L16 16M48 16L56 8M16 48L8 56M48 48L56 56" stroke="#14532D" strokeWidth="2" />
    <rect x="24" y="24" width="16" height="16" fill="#4ADE80" fillOpacity="0.5" />
  </svg>
);

const RuneIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M32 8L52 18V46L32 56L12 46V18L32 8Z" fill="#0891B2" stroke="#164E63" strokeWidth="2" />
    <path d="M32 20L24 32H40L32 44" stroke="#67E8F9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DragonIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M32 4C32 4 48 24 56 32C64 40 40 56 32 60C24 56 0 40 8 32C16 24 32 4 32 4Z" fill="#DC2626" stroke="#7F1D1D" strokeWidth="2" />
    <path d="M32 16L32 52" stroke="#FECACA" strokeWidth="2" />
    <path d="M32 32L48 32" stroke="#FECACA" strokeWidth="2" />
    <path d="M32 32L16 32" stroke="#FECACA" strokeWidth="2" />
  </svg>
);

const CorundumIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M32 6L54 20V44L32 58L10 44V20L32 6Z" fill="#DB2777" stroke="#831843" strokeWidth="2" />
    <path d="M32 6L54 20L32 32L10 20L32 6Z" fill="#F472B6" />
    <path d="M10 20L32 32V58L10 44V20Z" fill="#BE185D" />
    <path d="M54 20L32 32V58L54 44V20Z" fill="#9D174D" />
  </svg>
);

const AugiteIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 32L32 4L52 32L32 60L12 32Z" fill="#FDE047" stroke="#A16207" strokeWidth="2" />
    <path d="M4 32L32 12L60 32L32 52L4 32Z" stroke="#FEF08A" strokeWidth="1" fill="none" />
    <circle cx="32" cy="32" r="6" fill="#FEF9C3" />
  </svg>
);

const IridiumIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="32" cy="32" r="24" fill="#4338CA" stroke="#312E81" strokeWidth="2" />
    <circle cx="32" cy="32" r="16" fill="#3730A3" stroke="#6366F1" strokeWidth="2" />
    <circle cx="32" cy="32" r="8" fill="#818CF8" />
  </svg>
);

const PalladiumIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M32 2C15.4315 2 2 15.4315 2 32C2 48.5685 15.4315 62 32 62C48.5685 62 62 48.5685 62 32C62 15.4315 48.5685 2 32 2Z" fill="#7E22CE" stroke="#581C87" strokeWidth="2" />
    <path d="M32 12C20.9543 12 12 20.9543 12 32C12 43.0457 20.9543 52 32 52C43.0457 52 52 43.0457 52 32C52 20.9543 43.0457 12 32 12Z" stroke="#D8B4FE" strokeWidth="2" strokeDasharray="4 4" />
    <circle cx="32" cy="32" r="10" fill="#E9D5FF" />
  </svg>
);

export const OreIcon = ({ id, className = "w-10 h-10" }: { id: string, className?: string }) => {
  switch (id) {
    case 'copper': return <CopperIcon className={className} />;
    case 'tin': return <TinIcon className={className} />;
    case 'iron': return <IronIcon className={className} />;
    case 'coal': return <CoalIcon className={className} />;
    case 'silver': return <SilverIcon className={className} />;
    case 'gold': return <GoldIcon className={className} />;
    case 'mithril': return <MithrilIcon className={className} />;
    case 'adamant': return <AdamantIcon className={className} />;
    case 'rune': return <RuneIcon className={className} />;
    case 'dragon': return <DragonIcon className={className} />;
    case 'corundum': return <CorundumIcon className={className} />;
    case 'augite': return <AugiteIcon className={className} />;
    case 'iridium': return <IridiumIcon className={className} />;
    case 'palladium': return <PalladiumIcon className={className} />;
    default: return <div className={`${className} bg-slate-700 rounded-full`} />;
  }
};
