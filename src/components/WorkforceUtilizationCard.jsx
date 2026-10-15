import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { weeklyTrendData } from '../data/workforceData';

export default function WorkforceUtilizationCard({ stats }) {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Default breakdown if not passed
  const breakdown = stats?.breakdown || {
    fullyUtilized: { count: 22, percent: 36 },
    underutilized: { count: 18, percent: 30 },
    overutilized: { count: 6, percent: 10 },
    atCapacity: { count: 12, percent: 20 },
    available: { count: 2, percent: 4 }
  };

  const avgUtil = stats?.avgUtilization || 78;

  // Donut SVG parameters
  const size = 130;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Donut slices
  const slices = [
    { label: 'Fully Utilized', count: breakdown.fullyUtilized.count, percent: breakdown.fullyUtilized.percent, color: '#10b981' },
    { label: 'Underutilized', count: breakdown.underutilized.count, percent: breakdown.underutilized.percent, color: '#3b82f6' },
    { label: 'Overutilized', count: breakdown.overutilized.count, percent: breakdown.overutilized.percent, color: '#ef4444' },
    { label: 'At capacity', count: breakdown.atCapacity.count, percent: breakdown.atCapacity.percent, color: '#8b5cf6' },
    { label: 'Available', count: breakdown.available.count, percent: breakdown.available.percent, color: '#0ea5e9' }
  ];

  let accumulatedPercent = 0;

  // Trend line coordinates
  const svgWidth = 240;
  const svgHeight = 90;
  const paddingX = 25;
  const paddingY = 15;
  const minVal = 65;
  const maxVal = 85;

  const points = weeklyTrendData.map((d, i) => {
    const x = paddingX + (i * ((svgWidth - 2 * paddingX) / (weeklyTrendData.length - 1)));
    const y = svgHeight - paddingY - ((d.utilization - minVal) / (maxVal - minVal)) * (svgHeight - 2 * paddingY);
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`), '');
  const areaD = `${pathD} L ${points[points.length - 1].x} ${svgHeight} L ${points[0].x} ${svgHeight} Z`;

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Workforce Utilization</h3>
      </div>

      <div className="utilization-split">
        {/* Left: Donut Chart + Legend */}
        <div>
          <div className="donut-wrapper">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
              {slices.map((slice, idx) => {
                const strokeDasharray = `${(slice.percent / 100) * circumference} ${circumference}`;
                const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
                accumulatedPercent += slice.percent;

                return (
                  <circle
                    key={idx}
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="transparent"
                    stroke={slice.color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                    style={{ transition: 'all 0.5s ease' }}
                  />
                );
              })}
            </svg>
            <div className="donut-center-label">
              <div className="donut-number">{avgUtil}%</div>
              <div className="donut-sub">Overall<br />Utilization</div>
            </div>
          </div>

          <div className="utilization-legend" style={{ marginTop: '12px' }}>
            {slices.map((slice, idx) => (
              <div key={idx} className="legend-item">
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <span className="legend-color-dot" style={{ backgroundColor: slice.color }}></span>
                  {slice.label}
                </span>
                <span className="legend-count">{slice.count} ({slice.percent}%)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Trend Chart */}
        <div className="trend-chart-box">
          <div className="trend-header-row">
            <span className="trend-title">Weekly Utilization Trend</span>
            <span className="kpi-trend trend-up" style={{ fontSize: '0.7rem' }}>
              <TrendingUp size={11} /> +6%
            </span>
          </div>

          <div style={{ position: 'relative', width: '100%', height: svgHeight }}>
            <svg width="100%" height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ overflow: 'visible' }}>
              <defs>
                <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Area fill */}
              <path d={areaD} fill="url(#trendGradient)" />

              {/* Grid lines */}
              <line x1={paddingX} y1={svgHeight - paddingY} x2={svgWidth - paddingX} y2={svgHeight - paddingY} stroke="#e2e8f0" strokeDasharray="3 3" />
              <line x1={paddingX} y1={paddingY} x2={svgWidth - paddingX} y2={paddingY} stroke="#e2e8f0" strokeDasharray="3 3" />

              {/* Line */}
              <path d={pathD} fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

              {/* Points */}
              {points.map((p, i) => (
                <g key={i}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={hoveredPoint === i ? 5 : 3.5}
                    fill="#ffffff"
                    stroke="#2563eb"
                    strokeWidth="2"
                    style={{ cursor: 'pointer', transition: 'r 0.15s ease' }}
                    onMouseEnter={() => setHoveredPoint(i)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                  {/* Date label */}
                  <text
                    x={p.x}
                    y={svgHeight - 2}
                    textAnchor="middle"
                    fontSize="8"
                    fill="#94a3b8"
                    fontWeight="500"
                  >
                    {p.date}
                  </text>
                </g>
              ))}
            </svg>

            {hoveredPoint !== null && (
              <div
                style={{
                  position: 'absolute',
                  left: `${points[hoveredPoint].x - 20}px`,
                  top: `${points[hoveredPoint].y - 28}px`,
                  backgroundColor: '#0f172a',
                  color: '#ffffff',
                  fontSize: '0.7rem',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontWeight: '600',
                  pointerEvents: 'none'
                }}
              >
                {points[hoveredPoint].utilization}%
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
