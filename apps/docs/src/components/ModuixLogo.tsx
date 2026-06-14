import type { ComponentProps } from 'react';

export function ModuixLogo(props: ComponentProps<'svg'>) {
  return (
    <svg
      viewBox="48 46 148 118"
      role="img"
      aria-label="moduix"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M65 146V94c0-16.02 12.98-29 29-29 10.8 0 20.72 6.01 25.72 15.59L122 85l2.28-4.41C129.28 71.01 139.2 65 150 65c16.02 0 29 12.98 29 29v52"
        stroke="currentColor"
        strokeWidth="36"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M122 80v20" stroke="currentColor" strokeWidth="36" strokeLinecap="round" />
      <circle cx="122" cy="149" r="14" fill="currentColor" />
    </svg>
  );
}