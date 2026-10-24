import Image from "next/image";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const LOGO_RATIO = 1075 / 1000;

const sizes = {
  sm: { height: 90 },
  md: { height: 140 },
  lg: { height: 178 },
};

const sizeClasses = {
  sm: "h-[94px] md:h-[82px]",
  md: "h-[140px] md:h-[124px]",
  lg: "h-[178px]",
};

/** Canonical Eden Childcare logo supplied by the client. */
export function Logo({ className = "", size = "md" }: LogoProps) {
  const s = sizes[size];
  const width = Math.round(LOGO_RATIO * s.height);

  return (
    <Image
      src="/brand/eden-childcare-logo.svg"
      alt="Eden Childcare"
      width={width}
      height={s.height}
      className={`block w-auto object-contain ${sizeClasses[size]} ${className}`}
      priority={size === "sm"}
      unoptimized
    />
  );
}
