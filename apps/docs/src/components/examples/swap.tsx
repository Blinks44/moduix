import type { CssPropertyInput } from '../mdx/reference';

export const swapCustomAnimationCss = `
  .swap-custom-animation[data-animation='bounce'] [data-slot='swap-indicator'][data-state='open'] {
    animation: swap-bounce-enter var(--moduix-swap-transition, var(--moduix-transition-slow));
  }

  .swap-custom-animation[data-animation='bounce'] [data-slot='swap-indicator'][data-state='closed'] {
    animation: swap-bounce-exit var(--moduix-swap-transition, var(--moduix-transition-slow));
  }

  @keyframes swap-bounce-enter {
    from {
      opacity: 0;
      transform: scale(0.7);
    }

    70% {
      transform: scale(1.1);
    }
  }

  @keyframes swap-bounce-exit {
    to {
      opacity: 0;
      transform: scale(0.7);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .swap-custom-animation[data-animation='bounce'] [data-slot='swap-indicator'][data-state] {
      animation-duration: 1ms;
    }
  }
`;

export const swapOverrideCssProperties: CssPropertyInput[] = [
  [
    '--moduix-swap-transition',
    'var(--moduix-transition-slow)',
    'Controls the enter and exit animation timing.',
  ],
  [
    '--moduix-swap-enter-starting-opacity',
    '0',
    'Controls the starting opacity of the entering indicator.',
  ],
  [
    '--moduix-swap-enter-starting-scale',
    '0.5',
    'Controls the starting scale of the entering indicator.',
  ],
  [
    '--moduix-swap-exit-ending-opacity',
    '0',
    'Controls the ending opacity of the exiting indicator.',
  ],
  ['--moduix-swap-exit-ending-scale', '0.5', 'Controls the ending scale of the exiting indicator.'],
];