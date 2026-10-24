'use client';

import React from 'react';
import UnifiedCvPreview from '@/components/CvPreview';

interface CvPreviewProps {
  className?: string;
  isPrintMode?: boolean;
  isLoading?: boolean;
  scale?: number;
  showControlsBar?: boolean;
}

export default function CvPreview({
  className = '',
  isPrintMode = false,
  isLoading = false,
  scale,
  showControlsBar = false,
}: CvPreviewProps) {
  return (
    <div className={`w-full h-full flex flex-col items-center ${className}`}>
      <UnifiedCvPreview showControlsBar={showControlsBar} scale={scale} isLoading={isLoading} />
    </div>
  );
}
