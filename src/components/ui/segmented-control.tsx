"use client";

import styles from "./segmented-control.module.css";

type SegmentedControlProps = {
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  ariaLabel: string;
};

export function SegmentedControl({
  options,
  value,
  onChange,
  ariaLabel,
}: SegmentedControlProps) {
  return (
    <div className={styles.control} role="tablist" aria-label={ariaLabel}>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          role="tab"
          aria-selected={value === option}
          className={`${styles.option} ${value === option ? styles.optionActive : ""}`}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
