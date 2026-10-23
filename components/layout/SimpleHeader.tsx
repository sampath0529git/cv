'use client';

import React from 'react';
import Logo from '@/components/brand/Logo';

interface SimpleHeaderProps {
  rightElement?: React.ReactNode;
}

export default function SimpleHeader({ rightElement }: SimpleHeaderProps) {
  return (
    <header className="w-full bg-white border-b border-[#E8EAF5] px-6 sm:px-10 py-4 flex items-center justify-between sticky top-0 z-30">
      <Logo variant="dark" href="/" />
      {rightElement && <div>{rightElement}</div>}
    </header>
  );
}
