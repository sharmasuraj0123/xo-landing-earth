"use client";

import { useEffect, useState, type RefObject } from "react";

export function useIntersectionActive(
  ref: RefObject<Element | null>,
  options?: IntersectionObserverInit
) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "80px", threshold: 0, ...options }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, options]);

  return active;
}
