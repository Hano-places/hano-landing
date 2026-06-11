"use client";

import { useState } from "react";
import {
  emailWaitlistSchema,
  fullWaitlistSchema,
} from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import styles from "./waitlist-form.module.css";

type EmailFormProps = {
  cta: string;
  compact?: boolean;
};

export function EmailCaptureForm({ cta, compact = false }: EmailFormProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">(
    "idle",
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const result = emailWaitlistSchema.safeParse({ email });
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Invalid email");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "email-capture" }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setEmail("");
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("idle");
    }
  };

  if (status === "success") {
    return (
      <p className={styles.success} role="status">
        You&apos;re on the list! We&apos;ll be in touch soon.
      </p>
    );
  }

  return (
    <form
      className={`${styles.emailForm} ${compact ? styles.compact : ""}`}
      onSubmit={handleSubmit}
      noValidate
    >
      <Input
        id="email-capture"
        type="email"
        name="email"
        placeholder="Enter your email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={error}
        aria-label="Email address"
      />
      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Joining..." : cta}
      </Button>
    </form>
  );
}

type FullFormProps = {
  cta: string;
  trustMessage?: string;
};

export function FullWaitlistForm({ cta, trustMessage }: FullFormProps) {
  const [form, setForm] = useState({
    firstName: "",
    email: "",
    phone: "",
    favoriteRestaurant: "",
    favoriteCuisine: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">(
    "idle",
  );

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = fullWaitlistSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = String(issue.path[0]);
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "full-form" }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch {
      setErrors({ email: "Something went wrong. Please try again." });
      setStatus("idle");
    }
  };

  if (status === "success") {
    return (
      <p className={styles.success} role="status">
        Welcome to early access! Check your inbox for confirmation.
      </p>
    );
  }

  return (
    <form className={styles.fullForm} onSubmit={handleSubmit} noValidate>
      <div className={styles.row}>
        <Input
          id="firstName"
          name="firstName"
          placeholder="Enter first name"
          autoComplete="given-name"
          value={form.firstName}
          onChange={(e) => update("firstName", e.target.value)}
          error={errors.firstName}
          aria-label="First name"
        />
      </div>
      <Input
        id="waitlist-email"
        type="email"
        name="email"
        label="Email address"
        placeholder="Enter your email"
        hint="Your future sign-in email — this can't be changed later."
        autoComplete="email"
        value={form.email}
        onChange={(e) => update("email", e.target.value)}
        error={errors.email}
      />
      <Input
        id="phone"
        type="tel"
        name="phone"
        label="Phone number (optional)"
        placeholder="Enter phone number"
        autoComplete="tel"
        value={form.phone}
        onChange={(e) => update("phone", e.target.value)}
        error={errors.phone}
      />
      <Input
        id="favoriteRestaurant"
        name="favoriteRestaurant"
        label="Favorite restaurant in Kigali"
        placeholder="e.g. Boho"
        value={form.favoriteRestaurant}
        onChange={(e) => update("favoriteRestaurant", e.target.value)}
      />
      <Input
        id="favoriteCuisine"
        name="favoriteCuisine"
        label="Favorite cuisine (optional)"
        placeholder="e.g. Rwandan, Italian"
        value={form.favoriteCuisine}
        onChange={(e) => update("favoriteCuisine", e.target.value)}
      />
      <Button type="submit" fullWidth disabled={status === "loading"}>
        {status === "loading" ? "Joining..." : cta}
      </Button>
      {trustMessage && <p className={styles.trust}>{trustMessage}</p>}
    </form>
  );
}
