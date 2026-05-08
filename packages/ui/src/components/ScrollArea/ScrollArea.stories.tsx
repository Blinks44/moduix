import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { insideScrollSections } from '@/data/insideScrollSections';
import { ScrollArea } from './ScrollArea';
import styles from './ScrollArea.stories.module.css';

const meta = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ScrollArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    return (
      <ScrollArea className={styles.root} classNames={{ content: styles.textContent }}>
        {insideScrollSections.map((item) => (
          <section key={item.title}>
            <h3>{item.title}</h3>
            <p className={styles.paragraph}>{item.body}</p>
          </section>
        ))}
      </ScrollArea>
    );
  },
};

export const BothScrollbars: Story = {
  name: 'Both Scrollbars',
  render: () => {
    return (
      <ScrollArea
        scrollbars="both"
        className={styles.root}
        classNames={{ content: styles.gridContent }}
      >
        {Array.from({ length: 96 }, (_, index) => (
          <div key={index} className={styles.cell}>
            {index + 1}
          </div>
        ))}
      </ScrollArea>
    );
  },
};

export const GradientFade: Story = {
  name: 'Gradient Fade',
  render: () => {
    return (
      <ScrollArea fade className={styles.root} classNames={{ content: styles.textContent }}>
        {insideScrollSections.map((item) => (
          <section key={item.title}>
            <h3>{item.title}</h3>
            <p className={styles.paragraph}>{item.body}</p>
          </section>
        ))}
      </ScrollArea>
    );
  },
};

export const OverflowEdgeThreshold: Story = {
  name: 'Overflow Edge Threshold',
  render: () => {
    return (
      <ScrollArea
        fade
        className={styles.root}
        classNames={{ content: styles.compactTextContent }}
        overflowEdgeThreshold={28}
      >
        {insideScrollSections.map((item) => (
          <section key={item.title}>
            <h3>{item.title}</h3>
            <p className={styles.paragraph}>{item.body}</p>
          </section>
        ))}
      </ScrollArea>
    );
  },
};

export const KeepMounted: Story = {
  name: 'Keep Mounted',
  render: () => {
    const [denseContent, setDenseContent] = React.useState(false);

    return (
      <div className={styles.controls}>
        <button
          type="button"
          className={styles.button}
          onClick={() => setDenseContent((value) => !value)}
        >
          Toggle overflow: {denseContent ? 'on' : 'off'}
        </button>

        <ScrollArea
          className={styles.root}
          classNames={{ content: styles.compactTextContent }}
          scrollbarKeepMounted
        >
          {(denseContent ? insideScrollSections : insideScrollSections.slice(0, 2)).map((item) => (
            <section key={item.title}>
              <h3>{item.title}</h3>
              <p className={styles.paragraph}>{item.body}</p>
            </section>
          ))}
        </ScrollArea>
      </div>
    );
  },
};

export const StatefulStyles: Story = {
  name: 'Stateful Styles',
  render: () => {
    return (
      <ScrollArea
        className={styles.root}
        classNames={{
          viewport: styles.statefulViewport,
          content: styles.compactTextContent,
        }}
      >
        {insideScrollSections.map((item) => (
          <section key={item.title}>
            <h3>{item.title}</h3>
            <p className={styles.paragraph}>{item.body}</p>
          </section>
        ))}
      </ScrollArea>
    );
  },
};