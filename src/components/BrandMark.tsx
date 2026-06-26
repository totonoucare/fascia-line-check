export function BrandMark({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" aria-hidden="true" fill="none">
      <circle cx="60" cy="60" r="14" fill="#14213D" />
      <path
        d="M24 84a48 48 0 0 1 56-70"
        stroke="#14213D"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M88 20a48 48 0 0 1 8 58"
        stroke="#F59E0B"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M26 88a48 48 0 0 0 70 6"
        stroke="#14213D"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M42 39a32 32 0 0 1 50 28"
        stroke="#14213D"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M32 59a32 32 0 0 0 48 26"
        stroke="#14213D"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle cx="35" cy="51" r="8" fill="#14213D" />
      <circle cx="84" cy="82" r="7" fill="#14213D" />
    </svg>
  );
}
