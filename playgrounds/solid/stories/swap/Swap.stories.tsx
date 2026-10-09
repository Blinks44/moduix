import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Button } from '@/components/button/Button';
import { Swap, SwapIndicator, SwapRootProvider, useSwap } from '@/components/swap/Swap';
import { CheckIcon, PauseIcon, PlayIcon, UploadIcon } from '@/internal/icons/ui/Icons';
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
    const [uploaded, setUploaded] = createSignal(false);

    return (
      <Button
        aria-label={uploaded() ? 'Uploaded' : 'Upload'}
        onClick={() => setUploaded((value) => !value)}
      >
        <Swap swap={uploaded()}>
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
    const [playing, setPlaying] = createSignal(false);

    return (
      <Button
        aria-label={playing() ? 'Pause playback' : 'Play playback'}
        class={styles.feedbackButton}
        data-playing={playing() || undefined}
        onClick={() => setPlaying((value) => !value)}
      >
        <Swap swap={playing()} class={styles.feedbackSwap}>
          <SwapIndicator aria-hidden="true" type="off" class={styles.compactIndicator}>
            <PlayIcon />
            Play
          </SwapIndicator>
          <SwapIndicator aria-hidden="true" type="on" class={styles.compactIndicator}>
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
    const [swapped, setSwapped] = createSignal(false);

    return (
      <div class={styles.animationPresets}>
        {animations.map((animation) => (
          <Button
            aria-label={`${animation} animation`}
            onClick={() => setSwapped((value) => !value)}
          >
            <Swap animation={animation} swap={swapped()}>
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
    const [swapped, setSwapped] = createSignal(false);
    const swap = useSwap(() => ({ swap: swapped() }));

    return (
      <div class={styles.provider}>
        <SwapRootProvider
          asChild={(props) => (
            <Button
              {...props()}
              aria-label={swapped() ? 'Uploaded' : 'Upload'}
              onClick={() => setSwapped((value) => !value)}
            />
          )}
          value={swap}
        >
          <SwapIndicator aria-hidden="true" type="off">
            <UploadIcon />
          </SwapIndicator>
          <SwapIndicator aria-hidden="true" type="on">
            <CheckIcon />
          </SwapIndicator>
        </SwapRootProvider>
        <output>Visible: {swapped() ? 'Uploaded' : 'Upload'}</output>
      </div>
    );
  },
};

export const ExpandableButton: Story = {
  render: () => {
    const [hovered, setHovered] = createSignal(false);
    const [focused, setFocused] = createSignal(false);
    const expanded = () => hovered() || focused();

    return (
      <Button
        aria-label="Download"
        class={styles.compactButton}
        data-expanded={expanded() || undefined}
        size="icon-md"
        onBlur={() => setFocused(false)}
        onFocus={() => setFocused(true)}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <span class={styles.compactContent}>
          <UploadIcon aria-hidden="true" />
          <Swap swap={expanded()} class={styles.compactLabel}>
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