import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  size?: number;
};

export function OzLogo({ className, size = 24 }: Props) {
  return (
    <svg
      className={cn("select-none pointer-events-none", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
    >
      <defs>
        <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#89b4fa" />
          <stop offset="100%" stop-color="#cba6f7" />
        </linearGradient>
        <filter id="logo-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <rect
        x="10"
        y="10"
        width="80"
        height="80"
        rx="18"
        ry="18"
        fill="none"
        stroke="url(#logo-grad)"
        strokeWidth="6"
        strokeDasharray="12 6"
        filter="url(#logo-glow)"
      />
      <path
        d="M35 35 H65 L35 65 H65"
        fill="none"
        stroke="url(#logo-grad)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#logo-glow)"
      />
    </svg>
  );
}
