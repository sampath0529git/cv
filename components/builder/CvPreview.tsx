'use client';

import React from 'react';
import UnifiedCvPreview from '@/components/CvPreview';

interface CvPreviewProps {
  className?: string;
  isPrintMode?: boolean;
  isLoading?: boolean;
  scale?: number;
  showControlsBar?: boolean;
  onPagesChange?: (totalPages: number) => void;
}

export default function CvPreview({
  className = '',
  isLoading = false,
  scale,
  showControlsBar = false,
  onPagesChange,
}: CvPreviewProps) {
  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      <UnifiedCvPreview
        showControlsBar={showControlsBar}
        scale={scale}
        isLoading={isLoading}
        onPagesChange={onPagesChange}
      />
    </div>
  );
}
