'use client';

import React from 'react';
import UnifiedCvPreview from '@/components/CvPreview';

interface CvPreviewProps {
  className?: string;
  isPrintMode?: boolean;
  isLoading?: boolean;
  isPrimary?: boolean;
  scale?: number;
  showControlsBar?: boolean;
  showMarginGuides?: boolean;
  onPagesChange?: (totalPages: number) => void;
}

export default function CvPreview({
  className = '',
  isLoading = false,
  isPrimary = true,
  scale,
  showControlsBar = false,
  showMarginGuides = false,
  onPagesChange,
}: CvPreviewProps) {
  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      <UnifiedCvPreview
        isPrimary={isPrimary}
        showControlsBar={showControlsBar}
        showMarginGuides={showMarginGuides}
        scale={scale}
        isLoading={isLoading}
        onPagesChange={onPagesChange}
      />
    </div>
  );
}
