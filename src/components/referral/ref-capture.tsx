"use client";

import { useEffect } from "react";
import { currentRef } from "@/lib/referral";

/** Saves a referral code from the address (`?ref=`) so store links later on carry it. */
export function RefCapture() {
  useEffect(() => {
    currentRef();
  }, []);
  return null;
}
