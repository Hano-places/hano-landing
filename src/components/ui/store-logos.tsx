"use client";

import { useId } from "react";
import { STORE } from "@/content/images";

type LogoProps = {
  className?: string;
};

export function AppleLogo({ className }: LogoProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M13.5864 5.4544C13.4937 5.5264 11.8584 6.4496 11.8584 8.5024C11.8584 10.8768 13.9393 11.7168 14.0016 11.7376C13.992 11.7888 13.671 12.888 12.9044 14.008C12.2209 14.9936 11.507 15.9776 10.421 15.9776C9.33501 15.9776 9.05553 15.3456 7.80184 15.3456C6.5801 15.3456 6.1457 15.9984 5.15233 15.9984C4.15897 15.9984 3.46585 15.0864 2.66892 13.9664C1.74582 12.6512 1 10.608 1 8.6688C1 5.5584 3.01867 3.9088 5.00541 3.9088C6.06106 3.9088 6.94103 4.6032 7.60381 4.6032C8.23464 4.6032 9.21843 3.8672 10.4194 3.8672C10.8746 3.8672 12.5099 3.9088 13.5864 5.4544ZM9.84926 2.5504C10.3459 1.96 10.6973 1.1408 10.6973 0.3216C10.6973 0.208 10.6877 0.0928 10.667 0C9.85884 0.0304 8.89742 0.5392 8.31769 1.2128C7.86253 1.7312 7.43771 2.5504 7.43771 3.3808C7.43771 3.5056 7.45848 3.6304 7.46806 3.6704C7.51916 3.68 7.60221 3.6912 7.68526 3.6912C8.41032 3.6912 9.32224 3.2048 9.84926 2.5504Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function GooglePlayLogo({ className }: LogoProps) {
  const id = useId().replace(/:/g, "");
  const g1 = `google-play-gradient-1-${id}`;
  const g2 = `google-play-gradient-2-${id}`;
  const g3 = `google-play-gradient-3-${id}`;
  const g4 = `google-play-gradient-4-${id}`;

  return (
    <svg
      className={className}
      viewBox="0 0 27.5 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient
          id={g1}
          gradientUnits="userSpaceOnUse"
          x1="14.09"
          y1="1.87"
          x2="-5.9"
          y2="21.86"
        >
          <stop stopColor="#008eff" offset="0" />
          <stop stopColor="#008fff" offset=".01" />
          <stop stopColor="#00acff" offset=".26" />
          <stop stopColor="#00c0ff" offset=".51" />
          <stop stopColor="#00cdff" offset=".76" />
          <stop stopColor="#00d1ff" offset="1" />
        </linearGradient>
        <linearGradient
          id={g2}
          gradientUnits="userSpaceOnUse"
          x1="26.45"
          y1="15.32"
          x2="-2.37"
          y2="15.32"
        >
          <stop stopColor="#ffd800" offset="0" />
          <stop stopColor="#ff8a00" offset="1" />
        </linearGradient>
        <linearGradient
          id={g3}
          gradientUnits="userSpaceOnUse"
          x1="17.69"
          y1="18.05"
          x2="-9.41"
          y2="45.15"
        >
          <stop stopColor="#ff3a44" offset="0" />
          <stop stopColor="#b11162" offset="1" />
        </linearGradient>
        <linearGradient
          id={g4}
          gradientUnits="userSpaceOnUse"
          x1="-3.19"
          y1="-8.29"
          x2="8.92"
          y2="3.81"
        >
          <stop stopColor="#328e71" offset="0" />
          <stop stopColor="#2d9571" offset=".07" />
          <stop stopColor="#15bd74" offset=".48" />
          <stop stopColor="#06d575" offset=".8" />
          <stop stopColor="#00de76" offset="1" />
        </linearGradient>
      </defs>
      <path
        d="M.55.48A2.39 2.39 0 000 2.15v26.34a2.41 2.41 0 00.55 1.67l.09.09 14.75-14.76v-.35L.64.39z"
        fill={`url(#${g1})`}
      />
      <path
        d="M20.31 20.41l-4.92-4.92v-.35l4.92-4.91.11.06 5.83 3.31c1.67.94 1.67 2.49 0 3.44l-5.83 3.31z"
        fill={`url(#${g2})`}
      />
      <path
        d="M20.42 20.35l-5-5L.55 30.16a2 2 0 002.45.07l17.39-9.88"
        fill={`url(#${g3})`}
      />
      <path
        d="M20.42 10.29L3 .4A1.93 1.93 0 00.55.48l14.84 14.84z"
        fill={`url(#${g4})`}
      />
    </svg>
  );
}

/** @deprecated Use AppleLogo */
export function AppStoreLogo({ className }: LogoProps) {
  return <AppleLogo className={className} />;
}

/** @deprecated Use GooglePlayLogo */
export function PlayStoreLogo({ className }: LogoProps) {
  return <GooglePlayLogo className={className} />;
}

type DownloadBadgeProps = {
  className?: string;
};

export function AppStoreDownloadBadge({ className }: DownloadBadgeProps) {
  return (
    <span className={className} aria-hidden>
      <AppleLogo />
      <span>
        <span>Download on the</span>
        <strong>App Store</strong>
      </span>
    </span>
  );
}

export function PlayStoreDownloadBadge({ className }: DownloadBadgeProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- official Google Play badge asset
    <img
      src={STORE.googlePlay}
      alt=""
      width={180}
      height={53}
      className={className}
      aria-hidden
    />
  );
}
