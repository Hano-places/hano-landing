"use client";

import { useId, useState } from "react";
import styles from "./insights-chart.module.css";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/** An example week (not a real business): shapes typical of a Kigali place, busiest on the weekend. */
const SERIES = [
  { id: "views", label: "Page views", unit: "views", kind: "area", values: [64, 71, 58, 92, 138, 176, 121] },
  { id: "checkins", label: "Check-ins", unit: "check-ins", kind: "bars", values: [6, 8, 5, 11, 19, 27, 15] },
  { id: "ratings", label: "Ratings", unit: "ratings", kind: "bars", values: [2, 3, 1, 4, 6, 9, 5] },
  { id: "saves", label: "Saves", unit: "saves", kind: "area", values: [9, 7, 6, 12, 18, 24, 14] },
] as const;

const W = 560;
const H = 260;
const PAD = { l: 8, r: 8, t: 64, b: 30 };

/** A small dashboard like the one owners see: pick a number, hover or tap a day to read it. */
export function InsightsChart() {
  const [active, setActive] = useState<(typeof SERIES)[number]["id"]>("views");
  const [hover, setHover] = useState<number | null>(null);
  const gradient = useId();
  const s = SERIES.find((x) => x.id === active)!;
  const values: readonly number[] = s.values;
  const max = Math.max(...values) * 1.15;
  const total = s.values.reduce((a, b) => a + b, 0);
  const step = (W - PAD.l - PAD.r) / DAYS.length;
  const x = (i: number) => PAD.l + step * i + step / 2;
  const y = (v: number) => PAD.t + (1 - v / max) * (H - PAD.t - PAD.b);
  const shown = hover ?? values.indexOf(Math.max(...values));
  const line = s.values.map((v, i) => `${i ? "L" : "M"}${x(i)},${y(v)}`).join(" ");
  const area = `${line} L${x(DAYS.length - 1)},${H - PAD.b} L${x(0)},${H - PAD.b} Z`;

  return (
    <div className={styles.card}>
      <div className={styles.tabs} role="tablist" aria-label="Insight">
        {SERIES.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={t.id === active}
            className={`${styles.tab} ${t.id === active ? styles.tabOn : ""}`}
            onClick={() => {
              setActive(t.id);
              setHover(null);
            }}>
            {t.label}
          </button>
        ))}
      </div>

      <div className={styles.head}>
        <div>
          <p className={styles.big}>{total.toLocaleString("en-US")}</p>
          <p className={styles.caption}>{s.label} this week</p>
        </div>
        <span className={styles.example}>Example week</span>
      </div>

      <div className={styles.chartWrap} onMouseLeave={() => setHover(null)}>
        <svg viewBox={`0 0 ${W} ${H}`} className={styles.svg} role="img" aria-label={`${s.label} per day, example week: ${s.values.map((v, i) => `${DAYS[i]} ${v}`).join(", ")}`}>
          <defs>
            <linearGradient id={gradient} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#001814" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#001814" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0.25, 0.5, 0.75].map((f) => (
            <line key={f} x1={PAD.l} x2={W - PAD.r} y1={PAD.t + f * (H - PAD.t - PAD.b)} y2={PAD.t + f * (H - PAD.t - PAD.b)} className={styles.grid} />
          ))}

          {s.kind === "bars"
            ? s.values.map((v, i) => (
                <rect
                  key={i}
                  x={x(i) - step * 0.3}
                  y={y(v)}
                  width={step * 0.6}
                  height={H - PAD.b - y(v)}
                  rx={10}
                  className={i === shown ? styles.barOn : styles.bar}
                />
              ))
            : (
                <>
                  <path d={area} fill={`url(#${gradient})`} />
                  <path d={line} className={styles.line} />
                  {s.values.map((v, i) => (
                    <circle key={i} cx={x(i)} cy={y(v)} r={i === shown ? 7 : 4} className={i === shown ? styles.dotOn : styles.dot} />
                  ))}
                </>
              )}

          {shown !== null ? <line x1={x(shown)} x2={x(shown)} y1={PAD.t} y2={H - PAD.b} className={styles.guide} /> : null}

          {DAYS.map((d, i) => (
            <text key={d} x={x(i)} y={H - 8} textAnchor="middle" className={i === shown ? styles.dayOn : styles.day}>
              {d}
            </text>
          ))}

          {/* Hover / tap targets, one per day. */}
          {DAYS.map((d, i) => (
            <rect
              key={`hit-${d}`}
              x={PAD.l + step * i}
              y={0}
              width={step}
              height={H}
              fill="transparent"
              onMouseEnter={() => setHover(i)}
              onClick={() => setHover(i)}
              tabIndex={0}
              onFocus={() => setHover(i)}
              aria-label={`${d}: ${s.values[i]} ${s.unit}`}
            />
          ))}
        </svg>

        {shown !== null ? (
          <div className={styles.tip} style={{ left: `${(x(shown) / W) * 100}%`, top: `${(y(s.values[shown]) / H) * 100}%` }}>
            <span className={styles.tipValue}>
              <strong>{s.values[shown]}</strong> {s.unit}
            </span>
            <span>{DAYS[shown]}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
