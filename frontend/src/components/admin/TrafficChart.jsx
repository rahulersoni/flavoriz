import { motion } from "motion/react";

const data = [
  ["Mon", 52],
  ["Tue", 68],
  ["Wed", 61],
  ["Thu", 84],
  ["Fri", 76],
  ["Sat", 91],
  ["Sun", 87],
];

const width = 760;
const height = 270;
const left = 42;
const right = 18;
const top = 20;
const bottom = 38;
const innerW = width - left - right;
const innerH = height - top - bottom;

const points = data.map(([, value], i) => [
  left + (i / (data.length - 1)) * innerW,
  top + innerH - (value / 100) * innerH,
]);

const line = points.map(([x, y], i) => `${i ? "L" : "M"} ${x} ${y}`).join(" ");
const area = `${line} L ${points.at(-1)[0]} ${height - bottom} L ${points[0][0]} ${height - bottom} Z`;

export default function TrafficChart() {
  return (
    <section className="admin-card rounded-[26px] p-5 sm:p-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div>
          <p className="text-admin-xs font-admin-semibold text-admin-text-muted dark:text-gray-400">
            Website traction
          </p>

          <h3 className="mt-1 text-admin-xl font-admin-bold text-admin-text dark:text-gray-100">
            Visitors overview
          </h3>

          <p className="mt-1 text-admin-xs text-admin-text-soft dark:text-gray-500">
            Illustrative dashboard data · last 7 days
          </p>
        </div>

        <select className="h-9 rounded-admin-md border border-admin-border bg-admin-surface px-3 text-admin-xs font-admin-semibold text-admin-text outline-none focus:border-admin-primary dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
        </select>
      </div>

      <div className="mt-6 overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Visitors trend">
          {[0, 25, 50, 75, 100].map((value) => {
            const y = top + innerH - (value / 100) * innerH;

            return (
              <g key={value}>
                <line x1={left} x2={width - right} y1={y} y2={y} stroke="currentColor" strokeDasharray="4 5" className="text-admin-grid dark:text-gray-800" />

                <text x="4" y={y + 4} className="fill-admin-text-soft text-[10px] dark:fill-gray-500">
                  {value === 0 ? "0" : `${value}k`}
                </text>
              </g>
            );
          })}

          <motion.path
            d={area}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="fill-admin-primary-soft dark:fill-amber-400/10"
          />

          <motion.path
            d={line}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-admin-primary dark:text-amber-400"
          />

          {points.map(([x, y], i) => (
            <motion.circle
              key={data[i][0]}
              cx={x}
              cy={y}
              r="4.5"
              className="fill-admin-card stroke-admin-primary dark:fill-gray-900 dark:stroke-amber-400"
              strokeWidth="3"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.06 }}
            />
          ))}

          {data.map(([day], i) => (
            <text key={day} x={points[i][0]} y={height - 10} textAnchor="middle" className="fill-admin-text-soft text-[10px] dark:fill-gray-500">
              {day}
            </text>
          ))}
        </svg>
      </div>

      <div className="mt-2 flex items-center gap-2 text-admin-xs text-admin-text-muted dark:text-gray-400">
        <span className="size-2 rounded-full bg-admin-primary dark:bg-amber-400" />
        Visitors
        <strong className="ml-auto text-admin-text dark:text-gray-100">87.4K total</strong>
      </div>
    </section>
  );
}