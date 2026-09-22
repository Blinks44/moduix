import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '@/components/button';
import { createSplitterRegistry, Splitter, SplitterPanel, SplitterResizeTrigger, SplitterRootProvider, useSplitter } from '@/components/splitter/Splitter';
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
    <Splitter panels={panels} defaultSize={[40, 60]} className={styles.demo}>
      <SplitterPanel id="a" className={styles.panel}>
        A
      </SplitterPanel>
      <SplitterResizeTrigger id="a:b" aria-label="Resize panels" />
      <SplitterPanel id="b" className={styles.panel}>
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
      className={styles.vertical}
    >
      <SplitterPanel id="a" className={styles.panel}>
        Top
      </SplitterPanel>
      <SplitterResizeTrigger id="a:b" aria-label="Resize panels" />
      <SplitterPanel id="b" className={styles.panel}>
        Bottom
      </SplitterPanel>
    </Splitter>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [size, setSize] = useState([30, 70]);

    return (
      <div className={styles.stack}>
        <Splitter
          panels={panels}
          size={size}
          onResize={(details) => setSize(details.size)}
          className={styles.demo}
        >
          <SplitterPanel id="a" className={styles.panel}>
            A
          </SplitterPanel>
          <SplitterResizeTrigger id="a:b" aria-label="Resize panels" />
          <SplitterPanel id="b" className={styles.panel}>
            B
          </SplitterPanel>
        </Splitter>
        <output className={styles.status}>Sizes: {size.join(' / ')}</output>
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
      className={styles.demo}
    >
      <SplitterPanel id="sidebar" className={styles.panel}>
        Sidebar
      </SplitterPanel>
      <SplitterResizeTrigger id="sidebar:content" aria-label="Resize panels" />
      <SplitterPanel id="content" className={styles.panel}>
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
      className={styles.demo}
    >
      <SplitterPanel id="a" className={styles.panel}>
        A
      </SplitterPanel>
      <SplitterResizeTrigger id="a:b" aria-label="Resize panels A and B" />
      <SplitterPanel id="b" className={styles.panel}>
        B
      </SplitterPanel>
      <SplitterResizeTrigger id="b:c" aria-label="Resize panels B and C" />
      <SplitterPanel id="c" className={styles.panel}>
        C
      </SplitterPanel>
    </Splitter>
  ),
};

export const RootProvider: Story = {
  render: () => {
    const splitter = useSplitter({ panels, defaultSize: [50, 50] });

    return (
      <div className={styles.stack}>
        <div className={styles.toolbar}>
          <Button onClick={() => splitter.resetSizes()}>Reset</Button>
          <Button onClick={() => splitter.resizePanel('a', 25)}>Set A to 25%</Button>
        </div>
        <SplitterRootProvider value={splitter} className={styles.demo}>
          <SplitterPanel id="a" className={styles.panel}>
            A
          </SplitterPanel>
          <SplitterResizeTrigger id="a:b" aria-label="Resize panels" />
          <SplitterPanel id="b" className={styles.panel}>
            B
          </SplitterPanel>
        </SplitterRootProvider>
      </div>
    );
  },
};

export const Nested: Story = {
  render: () => {
    const [registry] = useState(() => createSplitterRegistry());
    const [verticalSize, setVerticalSize] = useState([50, 50]);

    return (
      <Splitter
        panels={[
          { id: 'left', minSize: 20 },
          { id: 'right', minSize: 20 },
        ]}
        defaultSize={[35, 65]}
        registry={registry}
        className={styles.demo}
      >
        <SplitterPanel id="left" className={styles.panel}>
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
            size={verticalSize}
            registry={registry}
            onResize={({ size }) => setVerticalSize(size)}
          >
            <SplitterPanel id="top" className={styles.panel}>
              Top
            </SplitterPanel>
            <SplitterResizeTrigger id="top:bottom" aria-label="Resize panels" />
            <SplitterPanel id="bottom" className={styles.panel}>
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
    <Splitter panels={panels} defaultSize={[42, 58]} className={styles.custom}>
      <SplitterPanel id="a" className={styles.panel}>
        A
      </SplitterPanel>
      <SplitterResizeTrigger id="a:b" aria-label="Resize panels" />
      <SplitterPanel id="b" className={styles.panel}>
        B
      </SplitterPanel>
    </Splitter>
  ),
};
