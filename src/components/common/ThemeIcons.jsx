import React from 'react';

/**
 * HUJRAH Theme-Colored Animated Delivery Truck SVG
 * Palette: Charcoal (#141414), Warm Desert Gold (#8C7A58 / #D8C39E), Emerald (#10B981)
 */
export function AnimatedDeliveryTruckIcon({ className = 'w-6 h-6', isMoving = true }) {
  return (
    <svg
      viewBox="0 0 64 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${isMoving ? 'animate-truck-drive' : ''}`}
      aria-hidden="true"
    >
      {/* Motion Speed Lines */}
      {isMoving && (
        <g className="animate-speed-lines">
          <line x1="2" y1="14" x2="10" y2="14" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round" />
          <line x1="0" y1="20" x2="8" y2="20" stroke="#8C7A58" strokeWidth="2" strokeLinecap="round" />
          <line x1="4" y1="26" x2="11" y2="26" stroke="#D8C39E" strokeWidth="2" strokeLinecap="round" />
        </g>
      )}

      {/* Cargo Box */}
      <rect x="11" y="8" width="29" height="22" rx="3" fill="#141414" />
      <rect x="13" y="10" width="25" height="18" rx="1.5" fill="#23211E" />
      {/* Gold Accent Stripe */}
      <rect x="11" y="23" width="29" height="3.5" fill="#C9A96E" />
      {/* HUJRAH emblem dot on cargo */}
      <circle cx="25.5" cy="17" r="3.5" fill="#8C7A58" opacity="0.9" />
      <path d="M24 17l1 1 2.2-2.2" stroke="#FAFAF9" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />

      {/* Cab */}
      <path
        d="M40 13h9.5c1.5 0 2.8.8 3.5 2.1l3.3 6.2c.5.9.7 1.9.7 2.9V28c0 1.1-.9 2-2 2H40V13z"
        fill="#8C7A58"
      />
      {/* Cab Window */}
      <path
        d="M42.5 15.5h6.2c.8 0 1.5.4 1.9 1.1l2.2 4.1H42.5v-5.2z"
        fill="#FAFAF9"
      />
      {/* Headlight */}
      <rect x="55" y="24.5" width="2.5" height="2.5" rx="1" fill="#FBBF24" />

      {/* Chassis */}
      <rect x="10" y="29.5" width="47" height="2.5" rx="1.25" fill="#141414" />

      {/* Rear Wheel */}
      <g className={isMoving ? 'origin-[21px_34px] animate-wheel-spin' : ''}>
        <circle cx="21" cy="34" r="5.5" fill="#141414" stroke="#FAFAF9" strokeWidth="1.5" />
        <circle cx="21" cy="34" r="2" fill="#C9A96E" />
      </g>

      {/* Front Wheel */}
      <g className={isMoving ? 'origin-[47px_34px] animate-wheel-spin' : ''}>
        <circle cx="47" cy="34" r="5.5" fill="#141414" stroke="#FAFAF9" strokeWidth="1.5" />
        <circle cx="47" cy="34" r="2" fill="#C9A96E" />
      </g>
    </svg>
  );
}

/**
 * Colorful Theme Shopping Bag SVG
 */
export function ThemeBagIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path
        d="M9.5 10V8a4.5 4.5 0 019 0v2"
        stroke="#8C7A58"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M5.5 10h17l1.3 12.2a2 2 0 01-2 2.3H6.2a2 2 0 01-2-2.3L5.5 10z"
        fill="#141414"
        stroke="#141414"
        strokeWidth="1.2"
      />
      <path d="M5.8 14.5h16.4" stroke="#C9A96E" strokeWidth="1.6" />
      <circle cx="14" cy="19" r="1.6" fill="#C9A96E" />
    </svg>
  );
}

/**
 * Colorful Theme Verified Shield SVG (Emerald & Gold)
 */
export function ThemeShieldIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path
        d="M14 3l8.5 3.6v6.7c0 5.4-3.6 10.3-8.5 11.7-4.9-1.4-8.5-6.3-8.5-11.7V6.6L14 3z"
        fill="#ECFDF5"
        stroke="#10B981"
        strokeWidth="1.8"
      />
      <path
        d="M10.5 14.2l2.4 2.4 4.8-4.8"
        stroke="#047857"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Colorful Animated Order Confirmed Burst SVG
 */
export function ThemeOrderConfirmedIcon({ className = 'w-12 h-12' }) {
  return (
    <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <circle cx="28" cy="28" r="24" fill="#ECFDF5" stroke="#10B981" strokeWidth="2" />
      <circle cx="28" cy="28" r="18" fill="#10B981" className="animate-soft-pulse" />
      <path
        d="M20.5 28.5l5 5 10-10"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="11" cy="13" r="2" fill="#C9A96E" />
      <circle cx="46" cy="14" r="1.8" fill="#8C7A58" />
      <circle cx="44" cy="44" r="2" fill="#C9A96E" />
    </svg>
  );
}

/**
 * Colorful Theme Search Magnifier SVG
 */
export function ThemeSearchIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5" fill="#FAFAF9" stroke="#141414" strokeWidth="1.7" />
      <path d="M15.5 15.5L20 20" stroke="#8C7A58" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Colorful Instagram Gradient SVG
 */
export function ThemeInstagramIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="hujrah-ig-grad" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="50%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5.5" fill="url(#hujrah-ig-grad)" />
      <circle cx="12" cy="12" r="4.2" stroke="#FFFFFF" strokeWidth="1.8" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="#FFFFFF" />
    </svg>
  );
}

/**
 * Colorful TikTok SVG
 */
export function ThemeTikTokIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5.5" fill="#141414" />
      <path
        d="M14.7 6.5c.6 1.2 1.6 2 2.9 2.2v2.3c-1.1 0-2.1-.3-2.9-.9v4.1a4 4 0 11-3.4-3.95v2.2a1.8 1.8 0 101.3 1.75V6.5h2.1z"
        fill="#25F4EE"
        transform="translate(-0.5, -0.4)"
      />
      <path
        d="M14.7 6.5c.6 1.2 1.6 2 2.9 2.2v2.3c-1.1 0-2.1-.3-2.9-.9v4.1a4 4 0 11-3.4-3.95v2.2a1.8 1.8 0 101.3 1.75V6.5h2.1z"
        fill="#FE2C55"
        transform="translate(0.5, 0.4)"
      />
      <path
        d="M14.7 6.5c.6 1.2 1.6 2 2.9 2.2v2.3c-1.1 0-2.1-.3-2.9-.9v4.1a4 4 0 11-3.4-3.95v2.2a1.8 1.8 0 101.3 1.75V6.5h2.1z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

/**
 * Colorful WhatsApp SVG
 */
export function ThemeWhatsAppIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#25D366" />
      <path
        d="M16.5 14.3c-.2-.1-1.3-.6-1.5-.7-.2-.1-.3-.1-.5.1-.1.2-.5.7-.7.8-.1.1-.2.2-.4.1-.2-.1-.9-.3-1.7-1.1-.6-.6-1.1-1.3-1.2-1.5-.1-.2 0-.3.1-.4l.4-.4c.1-.1.1-.2.2-.4.1-.1 0-.3 0-.4 0-.1-.5-1.2-.7-1.6-.2-.4-.4-.4-.5-.4h-.4c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9 0 1.1.8 2.2.9 2.3.1.2 1.6 2.4 3.8 3.4.5.2.9.4 1.3.5.5.2 1 .1 1.4.1.4-.1 1.3-.5 1.5-1 .2-.5.2-.9.1-1-.1-.1-.2-.1-.4-.2z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

/**
 * Crisp Apple Pay Badge SVG
 */
export function ThemeApplePayIcon({ className = 'h-6 w-12' }) {
  return (
    <svg viewBox="0 0 64 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <rect x="0.75" y="0.75" width="62.5" height="26.5" rx="6" fill="#141414" stroke="#8C7A58" strokeWidth="1.2" />
      <path
        d="M19.2 10.6c.5-.6.9-1.5.8-2.4-.8 0-1.7.5-2.2 1.1-.5.5-.9 1.4-.8 2.3.9.1 1.7-.4 2.2-1zm.8 1.2c-1.2-.1-2.2.7-2.8.7-.6 0-1.5-.7-2.4-.6-1.2 0-2.4.7-3 1.8-1.3 2.2-.3 5.5.9 7.3.6.9 1.3 1.9 2.3 1.8.9 0 1.3-.6 2.4-.6s1.4.6 2.4.6c1 0 1.6-.9 2.2-1.8.7-1 1-2 1-2-.1 0-1.9-.7-1.9-2.8 0-1.8 1.5-2.6 1.5-2.7-.8-1.2-2.1-1.3-2.6-1.4z"
        fill="#FFFFFF"
      />
      <text x="27" y="18.2" fill="#FFFFFF" fontSize="10.5" fontWeight="600" fontFamily="Plus Jakarta Sans, sans-serif">
        Pay
      </text>
    </svg>
  );
}

/**
 * Colorful UAE Cash on Delivery Banknote SVG
 */
export function ThemeUAECashIcon({ className = 'w-6 h-5' }) {
  return (
    <svg viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <rect x="1.5" y="3.5" width="29" height="17" rx="3" fill="#ECFDF5" stroke="#10B981" strokeWidth="1.5" />
      <circle cx="16" cy="12" r="4" fill="#10B981" />
      <circle cx="6.5" cy="12" r="1.2" fill="#8C7A58" />
      <circle cx="25.5" cy="12" r="1.2" fill="#8C7A58" />
    </svg>
  );
}

/**
 * Colorful Gold-Chip Card / POS SVG
 */
export function ThemeCardPosIcon({ className = 'w-6 h-5' }) {
  return (
    <svg viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <rect x="1.5" y="3.5" width="29" height="17" rx="3" fill="#141414" stroke="#8C7A58" strokeWidth="1.4" />
      <rect x="1.5" y="7" width="29" height="3.2" fill="#8C7A58" />
      <rect x="5" y="13" width="5.5" height="4" rx="1" fill="#FBBF24" />
    </svg>
  );
}
