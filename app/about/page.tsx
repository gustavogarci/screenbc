"use client";

import { useEffect } from "react";

export default function AboutPage() {
  useEffect(() => {
    window.location.replace("/login#about");
  }, []);

  return null;
}
