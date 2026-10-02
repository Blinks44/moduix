import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { computed, defineComponent, ref } from 'vue';
import { Button } from '@/components/button';
import {
  Swap,
  SwapIndicator,
  SwapRootProvider,
  type SwapAnimation,
  useSwap,
} from '@/components/swap';
import { CheckIcon, PauseIcon, PlayIcon, UploadIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './Swap.stories.module.css';

const meta = {
  title: 'Utilities/Swap',
  component: Swap,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Swap>;

export default meta;

type Story = StoryObj<typeof meta>;

const animations = ['fade', 'scale', 'rotate', 'flip'] as const satisfies readonly SwapAnimation[];

const storyComponents = {
  Button,
  CheckIcon,
  PauseIcon,
  PlayIcon,
  Swap,
  SwapIndicator,
  SwapRootProvider,
  UploadIcon,
};

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return { animations, styles, ...setup?.() };
      },
      template,
    });
}

export const Icons: Story = {
  render: renderStory(
    `
      <Button
        :aria-label="uploaded ? 'Uploaded' : 'Upload'"
        @click="uploaded = !uploaded"
      >
        <Swap :swap="uploaded">
          <SwapIndicator aria-hidden="true" type="off"><UploadIcon /></SwapIndicator>
          <SwapIndicator aria-hidden="true" type="on"><CheckIcon /></SwapIndicator>
        </Swap>
      </Button>
    `,
    () => ({ uploaded: ref(false) }),
  ),
};

export const ButtonFeedback: Story = {
  render: renderStory(
    `
      <Button
        :aria-label="playing ? 'Pause playback' : 'Play playback'"
        :class="styles.feedbackButton"
        :data-playing="playing || undefined"
        @click="playing = !playing"
      >
        <Swap :class="styles.feedbackSwap" :swap="playing">
          <SwapIndicator aria-hidden="true" :class="styles.compactIndicator" type="off">
            <PlayIcon />
            Play
          </SwapIndicator>
          <SwapIndicator aria-hidden="true" :class="styles.compactIndicator" type="on">
            <PauseIcon />
            Pause
          </SwapIndicator>
        </Swap>
      </Button>
    `,
    () => ({ playing: ref(false) }),
  ),
};

export const AnimationPresets: Story = {
  render: renderStory(
    `
      <div :class="styles.animationPresets">
        <Button
          v-for="animationName in animations"
          :key="animationName"
          :aria-label="animationName + ' animation'"
          @click="swapped = !swapped"
        >
          <Swap :animation="animationName" :swap="swapped">
            <SwapIndicator aria-hidden="true" type="off"><UploadIcon /></SwapIndicator>
            <SwapIndicator aria-hidden="true" type="on"><CheckIcon /></SwapIndicator>
          </Swap>
        </Button>
      </div>
    `,
    () => ({ swapped: ref(false) }),
  ),
};

export const RootProvider: Story = {
  render: renderStory(
    `
      <div :class="styles.provider">
        <SwapRootProvider as-child :value="swap">
          <Button
            :aria-label="swapped ? 'Uploaded' : 'Upload'"
            @click="swapped = !swapped"
          >
            <SwapIndicator aria-hidden="true" type="off"><UploadIcon /></SwapIndicator>
            <SwapIndicator aria-hidden="true" type="on"><CheckIcon /></SwapIndicator>
          </Button>
        </SwapRootProvider>
        <output>Visible: {{ swapped ? 'Uploaded' : 'Upload' }}</output>
      </div>
    `,
    () => {
      const swapped = ref(false);
      const swap = useSwap(computed(() => ({ swap: swapped.value })));
      return { swap, swapped };
    },
  ),
};

export const ExpandableButton: Story = {
  render: renderStory(
    `
      <Button
        aria-label="Download"
        :class="styles.compactButton"
        :data-expanded="expanded || undefined"
        size="icon-md"
        @blur="focused = false"
        @focus="focused = true"
        @pointerenter="hovered = true"
        @pointerleave="hovered = false"
      >
        <span :class="styles.compactContent">
          <UploadIcon aria-hidden="true" />
          <Swap :class="styles.compactLabel" :swap="expanded">
            <SwapIndicator aria-hidden="true" type="off" />
            <SwapIndicator aria-hidden="true" type="on">Download</SwapIndicator>
          </Swap>
        </span>
      </Button>
    `,
    () => {
      const hovered = ref(false);
      const focused = ref(false);
      const expanded = computed(() => hovered.value || focused.value);
      return { expanded, focused, hovered };
    },
  ),
};