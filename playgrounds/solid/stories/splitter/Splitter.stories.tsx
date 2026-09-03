import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Button } from '@/components/button/Button';
import { createSplitterRegistry, Splitter, useSplitter } from '@/components/splitter/Splitter';
import styles from './Splitter.stories.module.css';

const panels = [
  { id: 'a', minSize: 20 },
  { id: 'b', minSize: 20 },
];

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
    <Splitter panels={panels} defaultSize={[40, 60]} class={styles.demo}>
      <Splitter.Panel id="a" class={styles.panel}>
        A
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="a:b" aria-label="Resize panels" />
      <Splitter.Panel id="b" class={styles.panel}>
        B
      </Splitter.Panel>
    </Splitter>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Splitter orientation="vertical" panels={panels} defaultSize={[45, 55]} class={styles.vertical}>
      <Splitter.Panel id="a" class={styles.panel}>
        Top
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="a:b" aria-label="Resize panels" />
      <Splitter.Panel id="b" class={styles.panel}>
        Bottom
      </Splitter.Panel>
    </Splitter>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [size, setSize] = createSignal([30, 70]);

    return (
      <div class={styles.stack}>
        <Splitter
          panels={panels}
          size={size()}
          onResize={(details) => setSize(details.size)}
          class={styles.demo}
        >
          <Splitter.Panel id="a" class={styles.panel}>
            A
          </Splitter.Panel>
          <Splitter.ResizeTrigger id="a:b" aria-label="Resize panels" />
          <Splitter.Panel id="b" class={styles.panel}>
            B
          </Splitter.Panel>
        </Splitter>
        <output class={styles.status}>Sizes: {size().join(' / ')}</output>
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
      class={styles.demo}
    >
      <Splitter.Panel id="sidebar" class={styles.panel}>
        Sidebar
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="sidebar:content" aria-label="Resize panels" />
      <Splitter.Panel id="content" class={styles.panel}>
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
      class={styles.demo}
    >
      <Splitter.Panel id="a" class={styles.panel}>
        A
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="a:b" aria-label="Resize panels A and B" />
      <Splitter.Panel id="b" class={styles.panel}>
        B
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="b:c" aria-label="Resize panels B and C" />
      <Splitter.Panel id="c" class={styles.panel}>
        C
      </Splitter.Panel>
    </Splitter>
  ),
};

export const RootProvider: Story = {
  render: () => {
    const splitter = useSplitter({ panels, defaultSize: [50, 50] });

    return (
      <div class={styles.stack}>
        <div class={styles.toolbar}>
          <Button onClick={() => splitter().resetSizes()}>Reset</Button>
          <Button onClick={() => splitter().resizePanel('a', 25)}>Set A to 25%</Button>
        </div>
        <Splitter.RootProvider value={splitter} class={styles.demo}>
          <Splitter.Panel id="a" class={styles.panel}>
            A
          </Splitter.Panel>
          <Splitter.ResizeTrigger id="a:b" aria-label="Resize panels" />
          <Splitter.Panel id="b" class={styles.panel}>
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
        class={styles.demo}
      >
        <Splitter.Panel id="left" class={styles.panel}>
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
          >
            <Splitter.Panel id="top" class={styles.panel}>
              Top
            </Splitter.Panel>
            <Splitter.ResizeTrigger id="top:bottom" aria-label="Resize panels" />
            <Splitter.Panel id="bottom" class={styles.panel}>
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
    <Splitter panels={panels} defaultSize={[42, 58]} class={styles.custom}>
      <Splitter.Panel id="a" class={styles.panel}>
        A
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="a:b" aria-label="Resize panels" />
      <Splitter.Panel id="b" class={styles.panel}>
        B
      </Splitter.Panel>
    </Splitter>
  ),
};