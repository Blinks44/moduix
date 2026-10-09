import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref } from 'vue';
import { Button } from '@/components/button';
import {
  createSplitterRegistry,
  Splitter,
  SplitterPanel,
  SplitterResizeTrigger,
  SplitterResizeTriggerIndicator,
  SplitterRootProvider,
  useSplitter,
} from '@/components/splitter';

const panels = [
  { id: 'a', minSize: 20 },
  { id: 'b', minSize: 20 },
];

const meta = {
  title: 'Components/Splitter',
  component: Splitter,
  args: { panels },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Splitter>;

export default meta;

type Story = StoryObj<typeof meta>;

const demoRootClass = 'h-112 max-w-full w-[min(56rem,calc(100vw-2rem))]';
const panelClass = 'grid place-items-center font-medium';
const verticalRootClass = 'h-112 max-w-full w-[min(34rem,calc(100vw-2rem))]';
const stackClass = 'grid w-[min(56rem,calc(100vw-2rem))] min-w-[min(42rem,calc(100vw-2rem))] gap-4';
const toolbarClass = 'flex flex-wrap gap-2';
const statusClass = 'text-sm leading-5 text-muted-foreground';
const customPanelClass = `${panelClass} bg-primary/4`;
const customRootClass = `${demoRootClass} border-foreground/16 bg-primary/5`;

const splitterComponents = {
  Button,
  Splitter,
  SplitterPanel,
  SplitterResizeTrigger,
  SplitterResizeTriggerIndicator,
  SplitterRootProvider,
};

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: splitterComponents,
      setup() {
        return {
          demoRootClass,
          customPanelClass,
          customRootClass,
          panels,
          panelClass,
          stackClass,
          statusClass,
          toolbarClass,
          verticalRootClass,
          ...setup?.(),
        };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory(`
    <Splitter :panels="panels" :default-size="[40, 60]" :class="demoRootClass">
      <SplitterPanel id="a" :class="panelClass">A</SplitterPanel>
      <SplitterResizeTrigger id="a:b" aria-label="Resize panels" />
      <SplitterPanel id="b" :class="panelClass">B</SplitterPanel>
    </Splitter>
  `),
};

export const Vertical: Story = {
  render: renderStory(`
    <Splitter orientation="vertical" :panels="panels" :default-size="[45, 55]" :class="verticalRootClass">
      <SplitterPanel id="a" :class="panelClass">Top</SplitterPanel>
      <SplitterResizeTrigger id="a:b" aria-label="Resize panels" />
      <SplitterPanel id="b" :class="panelClass">Bottom</SplitterPanel>
    </Splitter>
  `),
};

export const Controlled: Story = {
  render: renderStory(
    `
      <div :class="stackClass">
        <Splitter v-model:size="size" :panels="panels" :class="demoRootClass">
          <SplitterPanel id="a" :class="panelClass">A</SplitterPanel>
          <SplitterResizeTrigger id="a:b" aria-label="Resize panels" />
          <SplitterPanel id="b" :class="panelClass">B</SplitterPanel>
        </Splitter>
        <output :class="statusClass">Sizes: {{ size.join(' / ') }}</output>
      </div>
    `,
    () => ({ size: ref([30, 70]) }),
  ),
};

export const Collapsible: Story = {
  render: renderStory(`
    <Splitter
      :panels="[
        { id: 'sidebar', minSize: 5, maxSize: 40, collapsible: true, collapsedSize: 5 },
        { id: 'content', minSize: 40 },
      ]"
      :default-size="[28, 72]"
      :class="demoRootClass"
    >
      <SplitterPanel id="sidebar" :class="panelClass">Sidebar</SplitterPanel>
      <SplitterResizeTrigger id="sidebar:content" aria-label="Resize panels" />
      <SplitterPanel id="content" :class="panelClass">Content</SplitterPanel>
    </Splitter>
  `),
};

export const MultiplePanels: Story = {
  render: renderStory(`
    <Splitter
      :panels="[
        { id: 'a', minSize: 15 },
        { id: 'b', minSize: 15 },
        { id: 'c', minSize: 15 },
      ]"
      :default-size="[25, 45, 30]"
      :class="demoRootClass"
    >
      <SplitterPanel id="a" :class="panelClass">A</SplitterPanel>
      <SplitterResizeTrigger id="a:b" aria-label="Resize panels A and B" />
      <SplitterPanel id="b" :class="panelClass">B</SplitterPanel>
      <SplitterResizeTrigger id="b:c" aria-label="Resize panels B and C" />
      <SplitterPanel id="c" :class="panelClass">C</SplitterPanel>
    </Splitter>
  `),
};

export const RootProvider: Story = {
  render: renderStory(
    `
      <div :class="stackClass">
        <SplitterRootProvider :value="splitter" :class="demoRootClass">
          <SplitterPanel id="a" :class="panelClass">A</SplitterPanel>
          <SplitterResizeTrigger id="a:b" aria-label="Resize panels" />
          <SplitterPanel id="b" :class="panelClass">B</SplitterPanel>
        </SplitterRootProvider>
        <output :class="statusClass">Sizes: {{ splitter.getSizes().join(' / ') }}</output>
        <div :class="toolbarClass">
          <Button @click="splitter.resetSizes">Reset</Button>
          <Button @click="splitter.resizePanel('a', 25)">Set A to 25%</Button>
        </div>
      </div>
    `,
    () => ({ splitter: useSplitter({ panels, defaultSize: [50, 50] }) }),
  ),
};

export const Nested: Story = {
  render: renderStory(
    `
      <Splitter :panels="horizontalPanels" :default-size="[35, 65]" :registry="registry" :class="demoRootClass">
        <SplitterPanel id="left" :class="panelClass">Left</SplitterPanel>
        <SplitterResizeTrigger id="left:right" aria-label="Resize panels" />
        <SplitterPanel id="right">
          <Splitter
            orientation="vertical"
            :panels="verticalPanels"
            v-model:size="verticalSize"
            :registry="registry"
            class="h-full w-full"
          >
            <SplitterPanel id="top" :class="panelClass">Top</SplitterPanel>
            <SplitterResizeTrigger id="top:bottom" aria-label="Resize panels" />
            <SplitterPanel id="bottom" :class="panelClass">Bottom</SplitterPanel>
          </Splitter>
        </SplitterPanel>
      </Splitter>
    `,
    () => ({
      horizontalPanels: [
        { id: 'left', minSize: 20 },
        { id: 'right', minSize: 20 },
      ],
      registry: createSplitterRegistry(),
      verticalPanels: [
        { id: 'top', minSize: 20 },
        { id: 'bottom', minSize: 20 },
      ],
      verticalSize: ref([50, 50]),
    }),
  ),
};

export const CustomStyling: Story = {
  render: renderStory(`
    <Splitter :panels="panels" :default-size="[42, 58]" :class="customRootClass">
      <SplitterPanel id="a" :class="customPanelClass">A</SplitterPanel>
      <SplitterResizeTrigger id="a:b" aria-label="Resize panels" class="before:bg-foreground/24">
        <SplitterResizeTriggerIndicator class="border-foreground/24" />
      </SplitterResizeTrigger>
      <SplitterPanel id="b" :class="customPanelClass">B</SplitterPanel>
    </Splitter>
  `),
};