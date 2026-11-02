import React from 'react';

/**
 * Global ambient refraction canvas mounted behind all routes.
 * Provides soft, multi-point British cobalt, sky, indigo, and emerald light pools
 * so frosted glass panels (`backdrop-blur-2xl backdrop-saturate-150`) visibly refract
 * luminous colour and specular highlights across the entire application.
 * Hidden automatically during ISO A4 printing (`no-print print:hidden`).
 */
export default function AmbientGlassCanvas() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden no-print print:hidden bg-[#EEF4FF]"
    >
      {/* Top-left royal cobalt refraction pool */}
      <div className="absolute -top-36 -left-28 w-[640px] h-[640px] rounded-full bg-blue-400/25 blur-3xl" />

      {/* Top-right luminous sky-cyan pool */}
      <div className="absolute -top-20 -right-24 w-[580px] h-[580px] rounded-full bg-sky-300/28 blur-3xl" />

      {/* Mid-viewport indigo atmospheric bloom */}
      <div className="absolute top-[34%] left-[18%] w-[560px] h-[520px] rounded-full bg-indigo-400/18 blur-3xl" />

      {/* Mid-right soft emerald-cyan highlight */}
      <div className="absolute top-[48%] -right-24 w-[480px] h-[480px] rounded-full bg-emerald-300/16 blur-3xl" />

      {/* Lower-left warm periwinkle/violet glow */}
      <div className="absolute -bottom-32 left-[8%] w-[600px] h-[520px] rounded-full bg-purple-300/16 blur-3xl" />

      {/* Lower-right sky-blue balance glow */}
      <div className="absolute -bottom-24 right-[12%] w-[520px] h-[460px] rounded-full bg-blue-300/22 blur-3xl" />

      {/* Crisp top-down specular veil for clean contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/15 to-white/40" />
    </div>
  );
}
