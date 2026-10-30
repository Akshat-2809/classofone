export function LogoMark({ size = 38 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <rect width="40" height="40" rx="10" fill="var(--hi)" />
      <path d="M14 13 L22 9 L22 31" fill="none" stroke="#17223A" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 31 H29" stroke="#17223A" strokeWidth="4.2" strokeLinecap="round" />
      <circle cx="31" cy="11" r="3.2" fill="#E35D52" />
    </svg>
  );
}
