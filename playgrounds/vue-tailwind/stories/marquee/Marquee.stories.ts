import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref, toRef } from 'vue';
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
import { cn } from '@/lib/moduix/cn';
import { LocaleProvider } from '@/locale';

const meta = {
  title: 'Components/Marquee',
  component: Marquee,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Marquee>;

export default meta;

type Story = StoryObj<typeof meta>;

const rootClass = 'w-[32rem] max-w-[calc(100vw-2rem)]';
const verticalRootClass = 'h-72 w-56 max-w-[calc(100vw-2rem)]';
const customRootClass =
  'w-[34rem] max-w-[calc(100vw-2rem)] rounded-lg border border-border bg-card p-3';
const itemClass =
  'inline-flex min-w-max items-center gap-2 rounded-md border border-border bg-muted px-3 py-2 text-sm leading-5 font-medium whitespace-nowrap text-foreground select-none';
const markClass =
  'inline-grid size-7 place-items-center rounded-sm bg-primary text-xs leading-4 text-primary-foreground';
const providerStackClass = 'grid gap-3';
const actionsClass = 'flex justify-end gap-2';
const statusClass = 'flex gap-3 text-sm leading-5 text-muted-foreground';

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
  props: { custom: Boolean },
  setup() {
    const partners = [
      { name: 'Atlas', mark: 'AT' },
      { name: 'Beacon', mark: 'BC' },
      { name: 'Compass', mark: 'CP' },
      { name: 'Delta', mark: 'DL' },
      { name: 'Echo', mark: 'EC' },
      { name: 'Foundry', mark: 'FD' },
    ];
    return { cn, itemClass, markClass, partners };
  },
  template: `
    <MarqueeItem
      v-for="item in partners"
      :key="item.name"
      :class="cn(itemClass, custom && 'border-primary/30 bg-primary/10')"
    >
      <span :class="markClass">{{ item.mark }}</span>
      <span>{{ item.name }}</span>
    </MarqueeItem>
  `,
});

const BasicMarquee = defineComponent({
  inheritAttrs: false,
  components: { Marquee, MarqueeContent, MarqueeItem, MarqueeViewport, MarqueeItems },
  props: { class: { type: String, default: undefined } },
  setup(props) {
    return { className: toRef(props, 'class'), cn, rootClass };
  },
  template: `
    <Marquee v-bind="$attrs" aria-label="Partner logos" :class="cn(rootClass, className)">
      <MarqueeViewport><MarqueeContent><MarqueeItems /></MarqueeContent></MarqueeViewport>
    </Marquee>
  `,
});

const RootProviderStory = defineComponent({
  components: { ...marqueeComponents, MarqueeItems },
  setup() {
    return {
      actionsClass,
      marquee: useMarquee({ translations: { root: 'Partner logos' } }),
      providerStackClass,
      rootClass,
    };
  },
  template: `
    <div :class="providerStackClass">
      <div :class="actionsClass">
        <Button size="sm" variant="outline" @click="marquee.pause()">Pause</Button>
        <Button size="sm" variant="outline" @click="marquee.resume()">Resume</Button>
      </div>
      <MarqueeRootProvider :value="marquee" :class="rootClass">
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
      providerStackClass,
      statusClass,
    };
  },
  template: `
    <div :class="providerStackClass">
      <BasicMarquee
        :loop-count="3"
        @loop-complete="handleLoopComplete"
        @complete="handleComplete"
      />
      <div :class="statusClass">
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
        return {
          actionsClass,
          customRootClass,
          rootClass,
          statusClass,
          verticalRootClass,
          providerStackClass,
        };
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
      <Marquee aria-label="Partner logos" :class="rootClass">
        <MarqueeEdge side="start" />
        <MarqueeViewport><MarqueeContent><MarqueeItems /></MarqueeContent></MarqueeViewport>
        <MarqueeEdge side="end" />
      </Marquee>
    </LocaleProvider>
  `),
};

export const Vertical: Story = {
  render: renderStory('<BasicMarquee side="bottom" :class="verticalRootClass" />'),
};

export const Speed: Story = {
  render: renderStory(`
    <div :class="providerStackClass">
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
    <Marquee aria-label="Partner logos" :class="rootClass">
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
    <Marquee aria-label="Partner logos" auto-fill pause-on-interaction :class="customRootClass">
      <MarqueeEdge side="start" />
      <MarqueeViewport><MarqueeContent><MarqueeItems custom /></MarqueeContent></MarqueeViewport>
      <MarqueeEdge side="end" />
    </Marquee>
  `),
};