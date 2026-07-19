import { Button, Swap } from '@moduix/react';
import {
  Check as CheckIcon,
  Download as DownloadIcon,
  Heart as HeartIcon,
  HeartOff as HeartOffIcon,
  Pause as PauseIcon,
  Play as PlayIcon,
  RefreshCw as RefreshCwIcon,
} from 'lucide-react';
import { useState } from 'react';
import type { CssPropertyInput } from '../mdx/preview';
import styles from './swap.module.css';

export const swapExpandableButtonCss = `
  .compactButton[data-size='icon-md'] {
    --compact-content-gap: 0;
    --compact-label-width: 0;

    width: var(--button-size-icon-md, var(--size-lg));
    min-width: var(--button-size-icon-md, var(--size-lg));
    overflow: hidden;
    transition:
      width var(--transition-default),
      min-width var(--transition-default);
  }

  .compactButton[data-size='icon-md'][data-expanded] {
    --compact-content-gap: var(--button-content-gap, var(--spacing-2));
    --compact-label-width: 4.25rem;

    width: 8.25rem;
    min-width: 8.25rem;
  }

  .compactContent {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--compact-content-gap);
    transition: gap var(--transition-default);
  }

  .compactLabel {
    width: var(--compact-label-width);
    min-width: 0;
    overflow: hidden;
    transition: width var(--transition-default);
  }
`;

export const swapButtonCss = `
  .feedbackButton {
    --swap-button-width: 7rem;

    width: var(--swap-button-width);
    min-width: var(--swap-button-width);
    overflow: hidden;
    transition:
      width var(--transition-default),
      min-width var(--transition-default);
  }

  .feedbackButton[data-playing] {
    --swap-button-width: 7.5rem;
  }

  .feedbackSwap {
    width: 100%;
  }

  .compactIndicator {
    gap: var(--button-content-gap, var(--spacing-2));
  }
`;

export const swapRotateCss = `
  .rotateSwap [data-slot='swap-indicator'] {
    backface-visibility: hidden;
  }

  .rotateSwap [data-slot='swap-indicator'][data-state='open'] {
    animation: swap-rotate-in var(--swap-transition, var(--transition-default));
  }

  .rotateSwap [data-slot='swap-indicator'][data-state='closed'] {
    animation: swap-rotate-out var(--swap-transition, var(--transition-default));
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
    animation: swap-flip-in var(--swap-transition, var(--transition-default));
  }

  .flipSwap [data-slot='swap-indicator'][data-state='closed'] {
    animation: swap-flip-out var(--swap-transition, var(--transition-default));
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
    '--swap-transition',
    'var(--transition-default)',
    'Controls the enter and exit animation timing.',
  ],
  [
    '--swap-enter-starting-opacity',
    '0',
    'Controls the starting opacity of the entering indicator.',
  ],
  ['--swap-enter-starting-scale', '0.92', 'Controls the starting scale of the entering indicator.'],
  ['--swap-exit-ending-opacity', '0', 'Controls the ending opacity of the exiting indicator.'],
  ['--swap-exit-ending-scale', '0.92', 'Controls the ending scale of the exiting indicator.'],
];

export function SwapIconExample() {
  const [downloaded, setDownloaded] = useState(false);

  return (
    <Button
      aria-label={downloaded ? 'Downloaded' : 'Download'}
      onClick={() => setDownloaded((value) => !value)}
    >
      <Swap swap={downloaded}>
        <Swap.Indicator aria-hidden="true" type="off">
          <DownloadIcon />
        </Swap.Indicator>
        <Swap.Indicator aria-hidden="true" type="on">
          <CheckIcon />
        </Swap.Indicator>
      </Swap>
    </Button>
  );
}

export function SwapButtonExample() {
  const [playing, setPlaying] = useState(false);

  return (
    <Button
      aria-label={playing ? 'Pause playback' : 'Play playback'}
      className={styles.feedbackButton}
      data-playing={playing || undefined}
      onClick={() => setPlaying((value) => !value)}
    >
      <Swap swap={playing} className={styles.feedbackSwap}>
        <Swap.Indicator aria-hidden="true" type="off" className={styles.compactIndicator}>
          <PlayIcon />
          Play
        </Swap.Indicator>
        <Swap.Indicator aria-hidden="true" type="on" className={styles.compactIndicator}>
          <PauseIcon />
          Pause
        </Swap.Indicator>
      </Swap>
    </Button>
  );
}

export function SwapRotateExample() {
  const [synced, setSynced] = useState(false);

  return (
    <Button aria-label={synced ? 'Synced' : 'Sync'} onClick={() => setSynced((value) => !value)}>
      <Swap swap={synced} className={styles.rotateSwap}>
        <Swap.Indicator aria-hidden="true" type="off">
          <RefreshCwIcon />
        </Swap.Indicator>
        <Swap.Indicator aria-hidden="true" type="on">
          <CheckIcon />
        </Swap.Indicator>
      </Swap>
    </Button>
  );
}

export function SwapFlipExample() {
  const [favorite, setFavorite] = useState(false);

  return (
    <Button
      aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
      onClick={() => setFavorite((value) => !value)}
    >
      <Swap swap={favorite} className={styles.flipSwap}>
        <Swap.Indicator aria-hidden="true" type="off">
          <HeartOffIcon />
        </Swap.Indicator>
        <Swap.Indicator aria-hidden="true" type="on">
          <HeartIcon />
        </Swap.Indicator>
      </Swap>
    </Button>
  );
}

export function SwapExpandableButtonExample() {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const expanded = hovered || focused;

  return (
    <Button
      aria-label="Download"
      className={styles.compactButton}
      data-expanded={expanded || undefined}
      size="icon-md"
      onBlur={() => setFocused(false)}
      onFocus={() => setFocused(true)}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <span className={styles.compactContent}>
        <DownloadIcon aria-hidden="true" />
        <Swap swap={expanded} className={styles.compactLabel}>
          <Swap.Indicator aria-hidden="true" type="off" />
          <Swap.Indicator aria-hidden="true" type="on">
            Download
          </Swap.Indicator>
        </Swap>
      </span>
    </Button>
  );
}