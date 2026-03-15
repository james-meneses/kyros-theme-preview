interface KyrosLogoProps {
  className?: string;
  size?: number;
}

export function KyrosLogo({ className, size = 24 }: KyrosLogoProps) {
  return (
    <img
      src="/kyros-logo.svg"
      alt="Kyros"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: "contain" }}
    />
  );
}
