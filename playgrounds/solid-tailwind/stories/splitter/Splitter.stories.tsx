import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Button } from '@/components/button/Button';
import { createSplitterRegistry, Splitter, useSplitter } from '@/components/splitter/Splitter';

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
      <Splitter.Panel id="a" class={panelClass}>
        A
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="a:b" aria-label="Resize panels" />
      <Splitter.Panel id="b" class={panelClass}>
        B
      </Splitter.Panel>
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
      <Splitter.Panel id="a" class={panelClass}>
        Top
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="a:b" aria-label="Resize panels" />
      <Splitter.Panel id="b" class={panelClass}>
        Bottom
      </Splitter.Panel>
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
          <Splitter.Panel id="a" class={panelClass}>
            A
          </Splitter.Panel>
          <Splitter.ResizeTrigger id="a:b" aria-label="Resize panels" />
          <Splitter.Panel id="b" class={panelClass}>
            B
          </Splitter.Panel>
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
      <Splitter.Panel id="sidebar" class={panelClass}>
        Sidebar
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="sidebar:content" aria-label="Resize panels" />
      <Splitter.Panel id="content" class={panelClass}>
        Content
      </Splitter.Panel>
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
      <Splitter.Panel id="a" class={panelClass}>
        A
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="a:b" aria-label="Resize panels A and B" />
      <Splitter.Panel id="b" class={panelClass}>
        B
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="b:c" aria-label="Resize panels B and C" />
      <Splitter.Panel id="c" class={panelClass}>
        C
      </Splitter.Panel>
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
        <Splitter.RootProvider value={splitter} class={demoRootClass}>
          <Splitter.Panel id="a" class={panelClass}>
            A
          </Splitter.Panel>
          <Splitter.ResizeTrigger id="a:b" aria-label="Resize panels" />
          <Splitter.Panel id="b" class={panelClass}>
            B
          </Splitter.Panel>
        </Splitter.RootProvider>
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
        <Splitter.Panel id="left" class={panelClass}>
          Left
        </Splitter.Panel>
        <Splitter.ResizeTrigger id="left:right" aria-label="Resize panels" />
        <Splitter.Panel id="right">
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
            <Splitter.Panel id="top" class={panelClass}>
              Top
            </Splitter.Panel>
            <Splitter.ResizeTrigger id="top:bottom" aria-label="Resize panels" />
            <Splitter.Panel id="bottom" class={panelClass}>
              Bottom
            </Splitter.Panel>
          </Splitter>
        </Splitter.Panel>
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
      <Splitter.Panel id="a" class={`${panelClass} bg-primary/4`}>
        A
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="a:b" aria-label="Resize panels" class="before:bg-foreground/24">
        <Splitter.ResizeTriggerIndicator class="border-foreground/24" />
      </Splitter.ResizeTrigger>
      <Splitter.Panel id="b" class={`${panelClass} bg-primary/4`}>
        B
      </Splitter.Panel>
    </Splitter>
  ),
};