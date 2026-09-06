import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function PauseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M10 9.2v5.6M14 9.2v5.6" />
    </svg>
  );
}

export function TagIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 11.4V4.8a1.3 1.3 0 0 1 1.3-1.3h6.6a1.3 1.3 0 0 1 .92.38l8 8a1.3 1.3 0 0 1 0 1.84l-6.6 6.6a1.3 1.3 0 0 1-1.84 0l-8-8a1.3 1.3 0 0 1-.38-.92Z" />
      <circle cx="7.8" cy="7.8" r="1.3" />
    </svg>
  );
}

export function ChartIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 20V4" />
      <path d="M4 20h16" />
      <path d="M8 16.5v-4M12.5 16.5V8M17 16.5v-6.5" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.2 5 6v5.4c0 4.2 2.9 8.1 7 9.4 4.1-1.3 7-5.2 7-9.4V6Z" />
      <path d="M9.4 12.2l1.9 1.9 3.5-3.6" />
    </svg>
  );
}

export function SyncIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20 12a8 8 0 0 1-13.6 5.7M4 12a8 8 0 0 1 13.6-5.7" />
      <path d="M17.6 3.4v3.2h-3.2M6.4 20.6v-3.2h3.2" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.2V12l3 1.8" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12.5 9.5 17 19 7.4" />
    </svg>
  );
}

export function ArrowIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14M13.5 6.5 19 12l-5.5 5.5" />
    </svg>
  );
}

export function AppleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.4 12.7c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.15-2.8.85-3.5.85-.7 0-1.85-.83-3.05-.81-1.55.02-3 .9-3.8 2.3-1.63 2.83-.42 7 1.16 9.3.78 1.12 1.7 2.38 2.9 2.34 1.17-.05 1.6-.75 3.02-.75 1.4 0 1.8.75 3.03.73 1.25-.02 2.04-1.14 2.8-2.27.88-1.3 1.24-2.56 1.26-2.63-.03-.01-2.42-.93-2.44-3.7ZM14.1 5.9c.63-.77 1.06-1.84.94-2.9-.9.04-2 .6-2.66 1.37-.58.67-1.1 1.76-.96 2.8 1.01.08 2.04-.51 2.68-1.27Z" />
    </svg>
  );
}

export function AndroidIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.6 9.5H6.4a.6.6 0 0 0-.6.6v6.6a1.6 1.6 0 0 0 1.6 1.6h.6v2.1a1.4 1.4 0 0 0 2.8 0v-2.1h2.4v2.1a1.4 1.4 0 0 0 2.8 0v-2.1h.6a1.6 1.6 0 0 0 1.6-1.6v-6.6a.6.6 0 0 0-.6-.6ZM3.9 9.4a1.4 1.4 0 0 0-1.4 1.4v4.3a1.4 1.4 0 0 0 2.8 0v-4.3a1.4 1.4 0 0 0-1.4-1.4Zm16.2 0a1.4 1.4 0 0 0-1.4 1.4v4.3a1.4 1.4 0 0 0 2.8 0v-4.3a1.4 1.4 0 0 0-1.4-1.4ZM15.3 4.2l.98-1.5a.35.35 0 0 0-.58-.38l-1.03 1.58a6.3 6.3 0 0 0-5.34 0L8.3 2.32a.35.35 0 1 0-.58.38l.98 1.5A5 5 0 0 0 5.9 8.3h12.2a5 5 0 0 0-2.8-4.1ZM9.3 6.6a.6.6 0 1 1 0-1.2.6.6 0 0 1 0 1.2Zm5.4 0a.6.6 0 1 1 0-1.2.6.6 0 0 1 0 1.2Z" />
    </svg>
  );
}
