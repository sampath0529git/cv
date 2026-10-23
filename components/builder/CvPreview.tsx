'use client';

import React from 'react';
import UnifiedCvPreview from '@/components/CvPreview';

interface CvPreviewProps {
  className?: string;
  isPrintMode?: boolean;
  isLoading?: boolean;
}

export default function CvPreview({ className = '', isPrintMode = false, isLoading = false }: CvPreviewProps) {
  return (
    <div className={`w-full h-full flex flex-col items-center ${className}`}>
      <UnifiedCvPreview showControlsBar={false} isLoading={isLoading} />
    </div>
  );
}
