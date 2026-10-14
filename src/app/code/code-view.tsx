"use client";

import { useEffect, useState } from "react";

import styles from "./code.module.css";

/** Shows the sign-in code from the link's #fragment with a real Copy button and an "Open Hano" link. */
export function CodeView() {
  const [code, setCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const raw = window.location.hash.replace(/^#/, "");
    setCode(/^\d{6}$/.test(raw) ? raw : "");
    // Drop the code from the address bar and history once read.
    if (raw) window.history.replaceState(null, "", window.location.pathname);
  }, []);

  const copy = async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // Older browsers: select-and-copy fallback.
      const el = document.createElement("textarea");
      el.value = code;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      el.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <p className={styles.eyebrow}>Hano</p>
        {code === null ? null : code ? (
          <>
            <h1 className={styles.title}>Your sign-in code</h1>
            <button type="button" className={styles.code} onClick={copy} aria-label={`Copy code ${code}`}>
              {code}
            </button>
            <button type="button" className={styles.primary} onClick={copy}>
              {copied ? "Copied ✓" : "Copy code"}
            </button>
            <a className={styles.secondary} href="hano://">
              Open Hano
            </a>
            <p className={styles.hint}>In Hano, tap <strong>Paste code</strong>. The code expires 10 minutes after it was sent.</p>
          </>
        ) : (
          <>
            <h1 className={styles.title}>This link has no code</h1>
            <p className={styles.hint}>Open the latest email from Hano and use the code there, or ask for a new one in the app.</p>
            <a className={styles.secondary} href="hano://">
              Open Hano
            </a>
          </>
        )}
      </div>
    </main>
  );
}
