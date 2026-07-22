import type { CssPropertyInput } from '../mdx/reference';

export const swapExpandableButtonCss = `
  .compactButton[data-size='icon-md'] {
    --compact-content-gap: 0;
    --compact-label-width: 0;

    width: var(--moduix-button-size-icon-md, var(--moduix-size-md));
    min-width: var(--moduix-button-size-icon-md, var(--moduix-size-md));
    overflow: hidden;
    transition:
      width var(--moduix-transition-default),
      min-width var(--moduix-transition-default);
  }

  .compactButton[data-size='icon-md'][data-expanded] {
    --compact-content-gap: var(--moduix-button-content-gap, var(--moduix-spacing-2));
    --compact-label-width: 4.25rem;

    width: 8.25rem;
    min-width: 8.25rem;
  }

  .compactContent {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--compact-content-gap);
    transition: gap var(--moduix-transition-default);
  }

  .compactLabel {
    width: var(--compact-label-width);
    min-width: 0;
    overflow: hidden;
    transition: width var(--moduix-transition-default);
  }
`;

export const swapButtonCss = `
  .feedbackButton {
    --swap-button-width: 7rem;

    width: var(--swap-button-width);
    min-width: var(--swap-button-width);
    overflow: hidden;
    transition:
      width var(--moduix-transition-default),
      min-width var(--moduix-transition-default);
  }

  .feedbackButton[data-playing] {
    --swap-button-width: 7.5rem;
  }

  .feedbackSwap {
    width: 100%;
  }

  .compactIndicator {
    gap: var(--moduix-button-content-gap, var(--moduix-spacing-2));
  }
`;

export const swapRotateCss = `
  .rotateSwap [data-slot='swap-indicator'] {
    backface-visibility: hidden;
  }

  .rotateSwap [data-slot='swap-indicator'][data-state='open'] {
    animation: swap-rotate-in var(--moduix-swap-transition, var(--moduix-transition-default));
  }

  .rotateSwap [data-slot='swap-indicator'][data-state='closed'] {
    animation: swap-rotate-out var(--moduix-swap-transition, var(--moduix-transition-default));
  }

  @keyframes swap-rotate-in {
    from {
      opacity: 0;
      transform: rotate(-180deg);
    }
  }

  @keyframes swap-rotate-out {
    to {
      opacity: 0;
      transform: rotate(180deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .rotateSwap [data-slot='swap-indicator'][data-state] {
      animation-duration: 1ms;
    }
  }
`;

export const swapFlipCss = `
  .flipSwap {
    perspective: 24rem;
  }

  .flipSwap [data-slot='swap-indicator'] {
    backface-visibility: hidden;
  }

  .flipSwap [data-slot='swap-indicator'][data-state='open'] {
    animation: swap-flip-in var(--moduix-swap-transition, var(--moduix-transition-default));
  }

  .flipSwap [data-slot='swap-indicator'][data-state='closed'] {
    animation: swap-flip-out var(--moduix-swap-transition, var(--moduix-transition-default));
  }

  @keyframes swap-flip-in {
    from {
      opacity: 0;
      transform: rotateY(-180deg);
    }
  }

  @keyframes swap-flip-out {
    to {
      opacity: 0;
      transform: rotateY(180deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .flipSwap [data-slot='swap-indicator'][data-state] {
      animation-duration: 1ms;
    }
  }
`;

export const swapOverrideCssProperties: CssPropertyInput[] = [
  [
    '--moduix-swap-transition',
    'var(--moduix-transition-default)',
    'Controls the enter and exit animation timing.',
  ],
  [
    '--moduix-swap-enter-starting-opacity',
    '0',
    'Controls the starting opacity of the entering indicator.',
  ],
  [
    '--moduix-swap-enter-starting-scale',
    '0.92',
    'Controls the starting scale of the entering indicator.',
  ],
  [
    '--moduix-swap-exit-ending-opacity',
    '0',
    'Controls the ending opacity of the exiting indicator.',
  ],
  [
    '--moduix-swap-exit-ending-scale',
    '0.92',
    'Controls the ending scale of the exiting indicator.',
  ],
];