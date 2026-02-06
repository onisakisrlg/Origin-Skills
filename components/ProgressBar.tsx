import React from 'react';

interface ProgressBarProps {
  percentage: number;
  label?: string;
  subLabel?: string;
  colorClass?: string;
  heightClass?: string;
  showText?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  percentage, 
  label, 
  subLabel,
  colorClass = 'bg-emerald-500', 
  heightClass = 'h-4',
  showText = true
}) => {
  // Clamp percentage between 0 and 100
  const clamped = Math.min(Math.max(percentage, 0), 100);

  return (
    <div className="w-full select-none">
      {(label || subLabel) && (
        <div className="flex justify-between text-xs mb-1 font-medium text-slate-400">
          <span>{label}</span>
          <span>{subLabel}</span>
        </div>
      )}
      <div className={`w-full bg-slate-800 rounded-full overflow-hidden ${heightClass} relative border border-slate-700`}>
        <div
          className={`${colorClass} h-full transition-all duration-100 ease-linear`}
          style={{ width: `${clamped}%` }}
        ></div>
        {showText && (
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white drop-shadow-md">
                {clamped.toFixed(0)}%
            </div>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
