interface LogoProps {
  className?: string;
}

function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 2 20.5 22h-3.2L12 8 6.7 22H3.5Z" fill="currentColor" />
      <path
        d="M8.9 14.6h8.5l1.1 3.9H10Z"
        className="fill-primary"
        stroke="#f5c518"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { Logo };