import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  CheckIcon,
  EyeClosedIcon,
  EyeIcon,
  PauseIcon,
  PlayIcon,
  RotateCwIcon,
  UploadIcon,
} from '@/lib/moduix/icons/ui';
import { Button } from '../button';
import { Swap } from './Swap';
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

export const Rotate: Story = {
  render: () => {
    const [synced, setSynced] = useState(false);

    return (
      <Button aria-label={synced ? 'Synced' : 'Sync'} onClick={() => setSynced((value) => !value)}>
        <Swap swap={synced} className={styles.rotateSwap}>
          <Swap.Indicator aria-hidden="true" type="off">
            <RotateCwIcon />
          </Swap.Indicator>
          <Swap.Indicator aria-hidden="true" type="on">
            <CheckIcon />
          </Swap.Indicator>
        </Swap>
      </Button>
    );
  },
};

export const Flip: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);

    return (
      <Button
        aria-label={visible ? 'Hide password' : 'Show password'}
        onClick={() => setVisible((value) => !value)}
      >
        <Swap swap={visible} className={styles.flipSwap}>
          <Swap.Indicator aria-hidden="true" type="off">
            <EyeClosedIcon />
          </Swap.Indicator>
          <Swap.Indicator aria-hidden="true" type="on">
            <EyeIcon />
          </Swap.Indicator>
        </Swap>
      </Button>
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