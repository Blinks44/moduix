import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '@/components/button';
import { Swap, SwapIndicator, SwapRootProvider, useSwap } from '@/components/swap/Swap';
import { CheckIcon, PauseIcon, PlayIcon, UploadIcon } from '@/lib/moduix/icons/ui';
import styles from './Swap.stories.module.css';

const meta = {
  title: 'Utilities/Swap',
  component: Swap,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Swap>;

export default meta;

type Story = StoryObj<typeof meta>;

const animations = ['fade', 'scale', 'rotate', 'flip'] as const;

export const Icons: Story = {
  render: () => {
    const [uploaded, setUploaded] = useState(false);

    return (
      <Button
        aria-label={uploaded ? 'Uploaded' : 'Upload'}
        onClick={() => setUploaded((value) => !value)}
      >
        <Swap swap={uploaded}>
          <SwapIndicator aria-hidden="true" type="off">
            <UploadIcon />
          </SwapIndicator>
          <SwapIndicator aria-hidden="true" type="on">
            <CheckIcon />
          </SwapIndicator>
        </Swap>
      </Button>
    );
  },
};

export const ButtonFeedback: Story = {
  render: () => {
    const [playing, setPlaying] = useState(false);

    return (
      <Button
        aria-label={playing ? 'Pause playback' : 'Play playback'}
        className={styles.feedbackButton}
        data-playing={playing || undefined}
        onClick={() => setPlaying((value) => !value)}
      >
        <Swap swap={playing} className={styles.feedbackSwap}>
          <SwapIndicator aria-hidden="true" type="off" className={styles.compactIndicator}>
            <PlayIcon />
            Play
          </SwapIndicator>
          <SwapIndicator aria-hidden="true" type="on" className={styles.compactIndicator}>
            <PauseIcon />
            Pause
          </SwapIndicator>
        </Swap>
      </Button>
    );
  },
};

export const AnimationPresets: Story = {
  render: () => {
    const [swapped, setSwapped] = useState(false);

    return (
      <div className={styles.animationPresets}>
        {animations.map((animation) => (
          <Button
            key={animation}
            aria-label={`${animation} animation`}
            onClick={() => setSwapped((value) => !value)}
          >
            <Swap animation={animation} swap={swapped}>
              <SwapIndicator aria-hidden="true" type="off">
                <UploadIcon />
              </SwapIndicator>
              <SwapIndicator aria-hidden="true" type="on">
                <CheckIcon />
              </SwapIndicator>
            </Swap>
          </Button>
        ))}
      </div>
    );
  },
};

export const RootProvider: Story = {
  render: () => {
    const [swapped, setSwapped] = useState(false);
    const swap = useSwap({ swap: swapped });

    return (
      <div className={styles.provider}>
        <SwapRootProvider asChild value={swap}>
          <Button
            aria-label={swapped ? 'Uploaded' : 'Upload'}
            onClick={() => setSwapped((value) => !value)}
          >
            <SwapIndicator aria-hidden="true" type="off">
              <UploadIcon />
            </SwapIndicator>
            <SwapIndicator aria-hidden="true" type="on">
              <CheckIcon />
            </SwapIndicator>
          </Button>
        </SwapRootProvider>
        <output>Visible: {swapped ? 'Uploaded' : 'Upload'}</output>
      </div>
    );
  },
};

export const ExpandableButton: Story = {
  render: () => {
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
          <UploadIcon aria-hidden="true" />
          <Swap swap={expanded} className={styles.compactLabel}>
            <SwapIndicator aria-hidden="true" type="off" />
            <SwapIndicator aria-hidden="true" type="on">
              Download
            </SwapIndicator>
          </Swap>
        </span>
      </Button>
    );
  },
};