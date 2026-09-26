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
import styles from './Splitter.stories.module.css';

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
        return { panels, styles, ...setup?.() };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory(`
    <Splitter :panels="panels" :default-size="[40, 60]" :class="styles.demo">
      <SplitterPanel id="a" :class="styles.panel">A</SplitterPanel>
      <SplitterResizeTrigger id="a:b" aria-label="Resize panels" />
      <SplitterPanel id="b" :class="styles.panel">B</SplitterPanel>
    </Splitter>
  `),
};

export const Vertical: Story = {
  render: renderStory(`
    <Splitter orientation="vertical" :panels="panels" :default-size="[45, 55]" :class="styles.vertical">
      <SplitterPanel id="a" :class="styles.panel">Top</SplitterPanel>
      <SplitterResizeTrigger id="a:b" aria-label="Resize panels" />
      <SplitterPanel id="b" :class="styles.panel">Bottom</SplitterPanel>
    </Splitter>
  `),
};

export const Controlled: Story = {
  render: renderStory(
    `
      <div :class="styles.stack">
        <Splitter v-model:size="size" :panels="panels" :class="styles.demo">
          <SplitterPanel id="a" :class="styles.panel">A</SplitterPanel>
          <SplitterResizeTrigger id="a:b" aria-label="Resize panels" />
          <SplitterPanel id="b" :class="styles.panel">B</SplitterPanel>
        </Splitter>
        <output :class="styles.status">Sizes: {{ size.join(' / ') }}</output>
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
      :class="styles.demo"
    >
      <SplitterPanel id="sidebar" :class="styles.panel">Sidebar</SplitterPanel>
      <SplitterResizeTrigger id="sidebar:content" aria-label="Resize panels" />
      <SplitterPanel id="content" :class="styles.panel">Content</SplitterPanel>
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
      :class="styles.demo"
    >
      <SplitterPanel id="a" :class="styles.panel">A</SplitterPanel>
      <SplitterResizeTrigger id="a:b" aria-label="Resize panels A and B" />
      <SplitterPanel id="b" :class="styles.panel">B</SplitterPanel>
      <SplitterResizeTrigger id="b:c" aria-label="Resize panels B and C" />
      <SplitterPanel id="c" :class="styles.panel">C</SplitterPanel>
    </Splitter>
  `),
};

export const RootProvider: Story = {
  render: renderStory(
    `
      <div :class="styles.stack">
        <SplitterRootProvider :value="splitter" :class="styles.demo">
          <SplitterPanel id="a" :class="styles.panel">A</SplitterPanel>
          <SplitterResizeTrigger id="a:b" aria-label="Resize panels" />
          <SplitterPanel id="b" :class="styles.panel">B</SplitterPanel>
        </SplitterRootProvider>
        <output :class="styles.status">Sizes: {{ splitter.getSizes().join(' / ') }}</output>
        <div :class="styles.toolbar">
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
      <Splitter :panels="horizontalPanels" :default-size="[35, 65]" :registry="registry" :class="styles.demo">
        <SplitterPanel id="left" :class="styles.panel">Left</SplitterPanel>
        <SplitterResizeTrigger id="left:right" aria-label="Resize panels" />
        <SplitterPanel id="right">
          <Splitter
            orientation="vertical"
            :panels="verticalPanels"
            v-model:size="verticalSize"
            :registry="registry"
            class="h-full w-full"
          >
            <SplitterPanel id="top" :class="styles.panel">Top</SplitterPanel>
            <SplitterResizeTrigger id="top:bottom" aria-label="Resize panels" />
            <SplitterPanel id="bottom" :class="styles.panel">Bottom</SplitterPanel>
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
    <Splitter :panels="panels" :default-size="[42, 58]" :class="styles.custom">
      <SplitterPanel id="a" :class="styles.panel">A</SplitterPanel>
      <SplitterResizeTrigger id="a:b" aria-label="Resize panels" />
      <SplitterPanel id="b" :class="styles.panel">B</SplitterPanel>
    </Splitter>
  `),
};