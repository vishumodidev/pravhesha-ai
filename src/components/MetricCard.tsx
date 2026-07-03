import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  timeframe?: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  sparklineData: number[];
  sparklineColor?: string;
}

export default function MetricCard({
  title,
  value,
  change,
  isPositive,
  timeframe = 'vs last 7 days',
  icon: Icon,
  iconColor,
  iconBg,
  sparklineData,
  sparklineColor = '#6366f1'
}: MetricCardProps) {
  // Generate SVG path for sparkline
  const generateSparklinePath = (data: number[], width: number, height: number) => {
    if (data.length < 2) return '';
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    
    return data
      .map((val, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - 3 - ((val - min) / range) * (height - 6);
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');
  };

  // Generate SVG area path for filled gradient sparkline
  const generateSparklineAreaPath = (data: number[], width: number, height: number) => {
    const linePath = generateSparklinePath(data, width, height);
    if (!linePath) return '';
    return `${linePath} L ${width} ${height} L 0 ${height} Z`;
  };

  const width = 120;
  const height = 40;
  const linePath = generateSparklinePath(sparklineData, width, height);
  const areaPath = generateSparklineAreaPath(sparklineData, width, height);
  const gradientId = `grad-${title.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between relative overflow-hidden group">
      {/* Background soft glow on hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
      
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
          {title}
        </span>
        <div className={`w-8 h-8 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center shadow-sm`}>
          <Icon size={16} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-end justify-between">
        <div>
          <h3 className="text-2xl font-bold text-slate-800 tracking-tight leading-none mb-2">
            {value}
          </h3>
          <div className="flex items-center gap-1">
            <span className={`flex items-center text-xs font-bold ${
              isPositive ? 'text-emerald-600' : 'text-rose-600'
            }`}>
              {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {change}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
              {timeframe}
            </span>
          </div>
        </div>

        {/* Sparkline Visualizer */}
        <div className="w-[120px] h-[40px] shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
          <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={sparklineColor} stopOpacity={0.25} />
                <stop offset="100%" stopColor={sparklineColor} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            {/* Filled Area */}
            {areaPath && (
              <path d={areaPath} fill={`url(#${gradientId})`} />
            )}
            {/* Outline Line */}
            {linePath && (
              <path
                d={linePath}
                fill="none"
                stroke={sparklineColor}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
        </div>
      </div>
    </div>
  );
}
