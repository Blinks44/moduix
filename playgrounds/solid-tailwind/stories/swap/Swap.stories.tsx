import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Button } from '@/components/button/Button';
import { Swap, SwapIndicator, SwapRootProvider, useSwap } from '@/components/swap/Swap';
import { CheckIcon, PauseIcon, PlayIcon, UploadIcon } from '@/lib/moduix/icons/ui';

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
const feedbackButtonClass =
  'w-28 min-w-28 overflow-hidden transition-[width,min-width] duration-200 ease-in-out data-playing:w-30 data-playing:min-w-30';
const compactButtonClass =
  'group/compact w-control-md min-w-control-md overflow-hidden transition-[width,min-width] duration-200 ease-in-out data-expanded:w-33 data-expanded:min-w-33';
const compactContentClass =
  'inline-flex items-center justify-center gap-0 transition-[gap] duration-200 ease-in-out group-data-[expanded]/compact:gap-2';
const compactLabelClass =
  'w-0 min-w-0 overflow-hidden transition-[width] duration-200 ease-in-out group-data-[expanded]/compact:w-17';
const compactIndicatorClass = 'gap-2';
const animationPresetsClass = 'flex flex-wrap justify-center gap-2';
const providerClass = 'grid justify-items-center gap-3';

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
        class={feedbackButtonClass}
        data-playing={playing() || undefined}
        onClick={() => setPlaying((value) => !value)}
      >
        <Swap swap={playing()} class="w-full">
          <SwapIndicator aria-hidden="true" type="off" class={compactIndicatorClass}>
            <PlayIcon />
            Play
          </SwapIndicator>
          <SwapIndicator aria-hidden="true" type="on" class={compactIndicatorClass}>
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
      <div class={animationPresetsClass}>
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
      <div class={providerClass}>
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
        class={compactButtonClass}
        data-expanded={expanded() || undefined}
        size="icon-md"
        onBlur={() => setFocused(false)}
        onFocus={() => setFocused(true)}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <span class={compactContentClass}>
          <UploadIcon aria-hidden="true" />
          <Swap swap={expanded()} class={compactLabelClass}>
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