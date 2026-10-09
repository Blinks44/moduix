import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref } from 'vue';
import { Button } from '@/components/button';
import {
  Marquee,
  MarqueeContent,
  MarqueeEdge,
  MarqueeItem,
  MarqueeRootProvider,
  MarqueeViewport,
  useMarquee,
} from '@/components/marquee';
import { LocaleProvider } from '@/locale';
import styles from './Marquee.stories.module.css';

const meta = {
  title: 'Components/Marquee',
  component: Marquee,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Marquee>;

export default meta;

type Story = StoryObj<typeof meta>;

const partners = [
  { name: 'Atlas', mark: 'AT' },
  { name: 'Beacon', mark: 'BC' },
  { name: 'Compass', mark: 'CP' },
  { name: 'Delta', mark: 'DL' },
  { name: 'Echo', mark: 'EC' },
  { name: 'Foundry', mark: 'FD' },
];

const marqueeComponents = {
  Button,
  LocaleProvider,
  Marquee,
  MarqueeContent,
  MarqueeEdge,
  MarqueeItem,
  MarqueeRootProvider,
  MarqueeViewport,
};

const MarqueeItems = defineComponent({
  components: { MarqueeItem },
  setup() {
    return { partners, styles };
  },
  template: `
    <MarqueeItem v-for="item in partners" :key="item.name" :class="styles.item">
      <span :class="styles.mark">{{ item.mark }}</span>
      <span>{{ item.name }}</span>
    </MarqueeItem>
  `,
});

const BasicMarquee = defineComponent({
  inheritAttrs: false,
  components: { Marquee, MarqueeContent, MarqueeItem, MarqueeViewport, MarqueeItems },
  setup() {
    return { styles };
  },
  template: `
    <Marquee v-bind="$attrs" aria-label="Partner logos" :class="styles.root">
      <MarqueeViewport>
        <MarqueeContent><MarqueeItems /></MarqueeContent>
      </MarqueeViewport>
    </Marquee>
  `,
});

const RootProviderStory = defineComponent({
  components: { ...marqueeComponents, MarqueeItems },
  setup() {
    return { marquee: useMarquee({ translations: { root: 'Partner logos' } }), styles };
  },
  template: `
    <div :class="styles.providerStack">
      <div :class="styles.actions">
        <Button size="sm" variant="outline" @click="marquee.pause()">Pause</Button>
        <Button size="sm" variant="outline" @click="marquee.resume()">Resume</Button>
      </div>
      <MarqueeRootProvider :value="marquee" :class="styles.root">
        <MarqueeViewport><MarqueeContent><MarqueeItems /></MarqueeContent></MarqueeViewport>
      </MarqueeRootProvider>
    </div>
  `,
});

const FiniteLoopsStory = defineComponent({
  components: { BasicMarquee },
  setup() {
    const loopCount = ref(0);
    const completeCount = ref(0);
    const handleLoopComplete = () => loopCount.value++;
    const handleComplete = () => completeCount.value++;
    return {
      completeCount,
      handleComplete,
      handleLoopComplete,
      loopCount,
      styles,
    };
  },
  template: `
    <div :class="styles.providerStack">
      <BasicMarquee
        :loop-count="3"
        @loop-complete="handleLoopComplete"
        @complete="handleComplete"
      />
      <div :class="styles.status">
        <span>Loops: {{ loopCount }}</span>
        <span>Completed: {{ completeCount }}</span>
      </div>
    </div>
  `,
});

const storyComponents = {
  ...marqueeComponents,
  BasicMarquee,
  FiniteLoopsStory,
  MarqueeItems,
  RootProviderStory,
};

function renderStory(template: string) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return { styles };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory('<BasicMarquee />'),
};

export const AutoFill: Story = {
  name: 'Auto Fill',
  render: renderStory('<BasicMarquee auto-fill spacing="2rem" />'),
};

export const PauseOnInteraction: Story = {
  name: 'Pause on Interaction',
  render: renderStory('<BasicMarquee pause-on-interaction />'),
};

export const Reverse: Story = {
  render: renderStory('<BasicMarquee reverse />'),
};

export const RTL: Story = {
  name: 'RTL',
  render: renderStory(`
    <LocaleProvider locale="ar">
      <Marquee aria-label="Partner logos" :class="styles.root">
        <MarqueeEdge side="start" />
        <MarqueeViewport><MarqueeContent><MarqueeItems /></MarqueeContent></MarqueeViewport>
        <MarqueeEdge side="end" />
      </Marquee>
    </LocaleProvider>
  `),
};

export const Vertical: Story = {
  render: renderStory('<BasicMarquee side="bottom" :class="styles.verticalRoot" />'),
};

export const Speed: Story = {
  render: renderStory(`
    <div :class="styles.providerStack">
      <BasicMarquee :speed="25" />
      <BasicMarquee :speed="100" />
    </div>
  `),
};

export const FiniteLoops: Story = {
  name: 'Finite Loops',
  render: renderStory('<FiniteLoopsStory />'),
};

export const WithEdges: Story = {
  name: 'With Edges',
  render: renderStory(`
    <Marquee aria-label="Partner logos" :class="styles.root">
      <MarqueeEdge side="start" />
      <MarqueeViewport><MarqueeContent><MarqueeItems /></MarqueeContent></MarqueeViewport>
      <MarqueeEdge side="end" />
    </Marquee>
  `),
};

export const RootProvider: Story = {
  name: 'Root Provider',
  render: renderStory('<RootProviderStory />'),
};

export const CustomStyling: Story = {
  name: 'Custom Styling',
  render: renderStory(`
    <Marquee aria-label="Partner logos" auto-fill pause-on-interaction :class="styles.customRoot">
      <MarqueeEdge side="start" />
      <MarqueeViewport><MarqueeContent><MarqueeItems /></MarqueeContent></MarqueeViewport>
      <MarqueeEdge side="end" />
    </Marquee>
  `),
};