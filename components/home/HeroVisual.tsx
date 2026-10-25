'use client';

import React from 'react';
import Image from 'next/image';

export default function HeroVisual() {
  return (
    <div className="relative w-full aspect-[876/768]">
      <Image
        src="/assets/hero-backdrop-clean.png"
        alt="Candidate with 3D glass CV template"
        fill
        priority
        sizes="(max-width: 768px) 100vw, 50vw"
        referrerPolicy="no-referrer"
        className="object-cover object-[78%_center]"
      />
    </div>
  );
}
