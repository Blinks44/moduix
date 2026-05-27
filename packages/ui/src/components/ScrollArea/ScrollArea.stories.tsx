import type { Meta, StoryObj } from '@storybook/react-vite';
import { insideScrollSections } from '@/data/insideScrollSections';
import {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from './ScrollArea';
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
      <ScrollArea className={styles.root}>
        <div className={styles.textContent}>
          {insideScrollSections.map((item) => (
            <section key={item.title}>
              <h3>{item.title}</h3>
              <p className={styles.paragraph}>{item.body}</p>
            </section>
          ))}
        </div>
      </ScrollArea>
    );
  },
};

export const BothScrollbars: Story = {
  name: 'Both Scrollbars',
  render: () => {
    return (
      <ScrollArea scrollbars="both" className={styles.root}>
        <div className={styles.gridContent}>
          {Array.from({ length: 96 }, (_, index) => (
            <div key={index} className={styles.cell}>
              {index + 1}
            </div>
          ))}
        </div>
      </ScrollArea>
    );
  },
};

export const EdgeFade: Story = {
  name: 'Edge Fade',
  render: () => {
    return (
      <ScrollArea fade className={styles.root}>
        <div className={styles.textContent}>
          {insideScrollSections.map((item) => (
            <section key={item.title}>
              <h3>{item.title}</h3>
              <p className={styles.paragraph}>{item.body}</p>
            </section>
          ))}
        </div>
      </ScrollArea>
    );
  },
};

export const CustomComposition: Story = {
  name: 'Custom Composition',
  render: () => {
    return (
      <ScrollAreaRoot className={styles.customRoot} data-fade="both" overflowEdgeThreshold={28}>
        <ScrollAreaViewport className={styles.customViewport}>
          <ScrollAreaContent className={styles.customContent}>
            {Array.from({ length: 80 }, (_, index) => (
              <div key={index} className={styles.customCell}>
                {index + 1}
              </div>
            ))}
          </ScrollAreaContent>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar className={styles.customVerticalScrollbar} keepMounted>
          <ScrollAreaThumb className={styles.customVerticalThumb} />
        </ScrollAreaScrollbar>
        <ScrollAreaScrollbar orientation="horizontal" className={styles.customHorizontalScrollbar}>
          <ScrollAreaThumb className={styles.customHorizontalThumb} />
        </ScrollAreaScrollbar>
        <ScrollAreaCorner className={styles.customCorner} />
      </ScrollAreaRoot>
    );
  },
};