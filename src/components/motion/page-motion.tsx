"use client";

import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Light scroll motion for any page, driven by data attributes:
 * - `data-reveal`: fades and rises in when it scrolls into view.
 * - `data-reveal-stagger`: its children do the same, one after another.
 * - `data-parallax="-40"`: drifts that many pixels while it crosses the screen.
 * - `data-magnetic`: leans toward the pointer on hover (mouse only).
 * Anything already on screen at load is left alone, so nothing flashes; reduced motion turns it all off.
 */
export function PageMotion() {
  const pathname = usePathname();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const below = (el: Element) => el.getBoundingClientRect().top > window.innerHeight * 0.92;

        const singles = gsap.utils.toArray<HTMLElement>("[data-reveal]").filter(below);
        const groups = gsap.utils
          .toArray<HTMLElement>("[data-reveal-stagger]")
          .flatMap((g) => Array.from(g.children) as HTMLElement[])
          .filter(below);
        const items = [...singles, ...groups];

        if (items.length) {
          gsap.set(items, { autoAlpha: 0, y: 36 });
          ScrollTrigger.batch(items, {
            start: "top 88%",
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.09, overwrite: true }),
          });
        }

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          gsap.to(el, {
            y: Number(el.dataset.parallax) || -40,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 },
          });
        });
      });

      mm.add("(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)", () => {
        const off: (() => void)[] = [];
        gsap.utils.toArray<HTMLElement>("[data-magnetic]").forEach((el) => {
          const x = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
          const y = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });
          const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            x((e.clientX - r.left - r.width / 2) * 0.25);
            y((e.clientY - r.top - r.height / 2) * 0.35);
          };
          const leave = () => {
            x(0);
            y(0);
          };
          el.addEventListener("pointermove", move);
          el.addEventListener("pointerleave", leave);
          off.push(() => {
            el.removeEventListener("pointermove", move);
            el.removeEventListener("pointerleave", leave);
          });
        });
        return () => off.forEach((f) => f());
      });

      // Images and fonts change heights after load; re-measure once they settle.
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      return () => {
        window.removeEventListener("load", refresh);
        mm.revert();
      };
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
