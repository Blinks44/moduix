import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CheckIcon, PauseIcon, PlayIcon, UploadIcon } from '@/lib/moduix/icons/ui';
import { Button } from '../../../src/components/button';
import { Swap } from '../../../src/components/swap/Swap';
import styles from './Swap.stories.module.css';

const meta = {
  title: 'Components/Swap',
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
          <Swap.Indicator aria-hidden="true" type="off">
            <UploadIcon />
          </Swap.Indicator>
          <Swap.Indicator aria-hidden="true" type="on">
            <CheckIcon />
          </Swap.Indicator>
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
              <Swap.Indicator aria-hidden="true" type="off">
                <UploadIcon />
              </Swap.Indicator>
              <Swap.Indicator aria-hidden="true" type="on">
                <CheckIcon />
              </Swap.Indicator>
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
    const swap = Swap.useSwap({ swap: swapped });

    return (
      <div className={styles.provider}>
        <Swap.RootProvider asChild value={swap}>
          <Button
            aria-label={swapped ? 'Uploaded' : 'Upload'}
            onClick={() => setSwapped((value) => !value)}
          >
            <Swap.Indicator aria-hidden="true" type="off">
              <UploadIcon />
            </Swap.Indicator>
            <Swap.Indicator aria-hidden="true" type="on">
              <CheckIcon />
            </Swap.Indicator>
          </Button>
        </Swap.RootProvider>
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
            <Swap.Indicator aria-hidden="true" type="off" />
            <Swap.Indicator aria-hidden="true" type="on">
              Download
            </Swap.Indicator>
          </Swap>
        </span>
      </Button>
    );
  },
};