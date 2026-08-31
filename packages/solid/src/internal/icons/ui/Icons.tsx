import type { JSX } from 'solid-js';

type IconProps = JSX.SvgSVGAttributes<SVGSVGElement>;

export function PlusIcon(props: IconProps) {
  const accessibilityProps = { 'aria-hidden': 'true', focusable: 'false' } as const;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
      {...accessibilityProps}
      {...props}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}