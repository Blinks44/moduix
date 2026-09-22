import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Button } from '@/components/button/Button';
import { createSplitterRegistry, Splitter, SplitterPanel, SplitterResizeTrigger, SplitterResizeTriggerIndicator, SplitterRootProvider, useSplitter } from '@/components/splitter/Splitter';

const panels = [
  { id: 'a', minSize: 20 },
  { id: 'b', minSize: 20 },
];

const demoRootClass = 'h-112 max-w-full w-[min(56rem,calc(100vw-2rem))]';
const panelClass = 'grid place-items-center font-medium';
const verticalRootClass = 'h-112 max-w-full w-[min(34rem,calc(100vw-2rem))]';
const stackClass = 'grid w-[min(56rem,calc(100vw-2rem))] min-w-[min(42rem,calc(100vw-2rem))] gap-4';
const toolbarClass = 'flex flex-wrap gap-2';
const statusClass = 'text-sm leading-5 text-muted-foreground';

const meta = {
  title: 'Components/Splitter',
  component: Splitter,
  args: {
    panels,
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Splitter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Splitter panels={panels} defaultSize={[40, 60]} class={demoRootClass}>
      <SplitterPanel id="a" class={panelClass}>
        A
      </SplitterPanel>
      <SplitterResizeTrigger id="a:b" aria-label="Resize panels" />
      <SplitterPanel id="b" class={panelClass}>
        B
      </SplitterPanel>
    </Splitter>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Splitter
      orientation="vertical"
      panels={panels}
      defaultSize={[45, 55]}
      class={verticalRootClass}
    >
      <SplitterPanel id="a" class={panelClass}>
        Top
      </SplitterPanel>
      <SplitterResizeTrigger id="a:b" aria-label="Resize panels" />
      <SplitterPanel id="b" class={panelClass}>
        Bottom
      </SplitterPanel>
    </Splitter>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [size, setSize] = createSignal([30, 70]);

    return (
      <div class={stackClass}>
        <Splitter
          panels={panels}
          size={size()}
          onResize={(details) => setSize(details.size)}
          class={demoRootClass}
        >
          <SplitterPanel id="a" class={panelClass}>
            A
          </SplitterPanel>
          <SplitterResizeTrigger id="a:b" aria-label="Resize panels" />
          <SplitterPanel id="b" class={panelClass}>
            B
          </SplitterPanel>
        </Splitter>
        <output class={statusClass}>Sizes: {size().join(' / ')}</output>
      </div>
    );
  },
};

export const Collapsible: Story = {
  render: () => (
    <Splitter
      panels={[
        { id: 'sidebar', minSize: 5, maxSize: 40, collapsible: true, collapsedSize: 5 },
        { id: 'content', minSize: 40 },
      ]}
      defaultSize={[28, 72]}
      class={demoRootClass}
    >
      <SplitterPanel id="sidebar" class={panelClass}>
        Sidebar
      </SplitterPanel>
      <SplitterResizeTrigger id="sidebar:content" aria-label="Resize panels" />
      <SplitterPanel id="content" class={panelClass}>
        Content
      </SplitterPanel>
    </Splitter>
  ),
};

export const MultiplePanels: Story = {
  render: () => (
    <Splitter
      panels={[
        { id: 'a', minSize: 15 },
        { id: 'b', minSize: 15 },
        { id: 'c', minSize: 15 },
      ]}
      defaultSize={[25, 45, 30]}
      class={demoRootClass}
    >
      <SplitterPanel id="a" class={panelClass}>
        A
      </SplitterPanel>
      <SplitterResizeTrigger id="a:b" aria-label="Resize panels A and B" />
      <SplitterPanel id="b" class={panelClass}>
        B
      </SplitterPanel>
      <SplitterResizeTrigger id="b:c" aria-label="Resize panels B and C" />
      <SplitterPanel id="c" class={panelClass}>
        C
      </SplitterPanel>
    </Splitter>
  ),
};

export const RootProvider: Story = {
  render: () => {
    const splitter = useSplitter({ panels, defaultSize: [50, 50] });

    return (
      <div class={stackClass}>
        <div class={toolbarClass}>
          <Button onClick={() => splitter().resetSizes()}>Reset</Button>
          <Button onClick={() => splitter().resizePanel('a', 25)}>Set A to 25%</Button>
        </div>
        <SplitterRootProvider value={splitter} class={demoRootClass}>
          <SplitterPanel id="a" class={panelClass}>
            A
          </SplitterPanel>
          <SplitterResizeTrigger id="a:b" aria-label="Resize panels" />
          <SplitterPanel id="b" class={panelClass}>
            B
          </SplitterPanel>
        </SplitterRootProvider>
      </div>
    );
  },
};

export const Nested: Story = {
  render: () => {
    const registry = createSplitterRegistry();
    const [verticalSize, setVerticalSize] = createSignal([50, 50]);

    return (
      <Splitter
        panels={[
          { id: 'left', minSize: 20 },
          { id: 'right', minSize: 20 },
        ]}
        defaultSize={[35, 65]}
        registry={registry}
        class={demoRootClass}
      >
        <SplitterPanel id="left" class={panelClass}>
          Left
        </SplitterPanel>
        <SplitterResizeTrigger id="left:right" aria-label="Resize panels" />
        <SplitterPanel id="right">
          <Splitter
            orientation="vertical"
            panels={[
              { id: 'top', minSize: 20 },
              { id: 'bottom', minSize: 20 },
            ]}
            size={verticalSize()}
            registry={registry}
            onResize={({ size }) => setVerticalSize(size)}
            class="h-full w-full"
          >
            <SplitterPanel id="top" class={panelClass}>
              Top
            </SplitterPanel>
            <SplitterResizeTrigger id="top:bottom" aria-label="Resize panels" />
            <SplitterPanel id="bottom" class={panelClass}>
              Bottom
            </SplitterPanel>
          </Splitter>
        </SplitterPanel>
      </Splitter>
    );
  },
};

export const CustomStyling: Story = {
  render: () => (
    <Splitter
      panels={panels}
      defaultSize={[42, 58]}
      class={`${demoRootClass} border-foreground/16 bg-primary/5`}
    >
      <SplitterPanel id="a" class={`${panelClass} bg-primary/4`}>
        A
      </SplitterPanel>
      <SplitterResizeTrigger id="a:b" aria-label="Resize panels" class="before:bg-foreground/24">
        <SplitterResizeTriggerIndicator class="border-foreground/24" />
      </SplitterResizeTrigger>
      <SplitterPanel id="b" class={`${panelClass} bg-primary/4`}>
        B
      </SplitterPanel>
    </Splitter>
  ),
};
