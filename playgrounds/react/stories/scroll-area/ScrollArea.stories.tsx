import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/button';
import {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaRootProvider,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
  useScrollArea,
} from '@/components/scroll-area/ScrollArea';
import { insideScrollSections } from '../data/insideScrollSections';
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

function TextContent() {
  return (
    <div className={styles.textContent}>
      {insideScrollSections.map((item) => (
        <section key={item.title}>
          <h3>{item.title}</h3>
          <p className={styles.paragraph}>{item.body}</p>
        </section>
      ))}
    </div>
  );
}

function VerticalScrollArea() {
  return (
    <ScrollArea className={styles.root}>
      <ScrollAreaViewport>
        <ScrollAreaContent>
          <TextContent />
        </ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar>
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollArea>
  );
}

function RootProviderStory() {
  const scrollArea = useScrollArea();

  return (
    <div className={styles.providerStack}>
      <div className={styles.actions}>
        <Button
          size="sm"
          variant="outline"
          onClick={() => scrollArea.scrollToEdge({ edge: 'top' })}
        >
          Top
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => scrollArea.scrollToEdge({ edge: 'bottom' })}
        >
          Bottom
        </Button>
      </div>
      <ScrollAreaRootProvider value={scrollArea} className={styles.root}>
        <ScrollAreaViewport>
          <ScrollAreaContent>
            <TextContent />
          </ScrollAreaContent>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar>
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
        <ScrollAreaCorner />
      </ScrollAreaRootProvider>
    </div>
  );
}

export const Basic: Story = {
  render: () => <VerticalScrollArea />,
};

export const AlwaysVisible: Story = {
  name: 'Always Visible',
  render: () => (
    <ScrollArea className={styles.root} variant="always">
      <ScrollAreaViewport>
        <ScrollAreaContent>
          <TextContent />
        </ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar>
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollArea>
  ),
};

export const Fade: Story = {
  render: () => (
    <ScrollArea className={styles.root} fade>
      <ScrollAreaViewport>
        <ScrollAreaContent>
          <TextContent />
        </ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar>
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollArea>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <ScrollArea className={styles.horizontalRoot}>
      <ScrollAreaViewport>
        <ScrollAreaContent>
          <p className={styles.wideParagraph}>{insideScrollSections[0]?.body}</p>
        </ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar orientation="horizontal">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollArea>
  ),
};

export const RTL: Story = {
  name: 'RTL',
  render: () => (
    <ScrollArea className={styles.horizontalRoot} dir="rtl" variant="always">
      <ScrollAreaViewport aria-label="ملاحظات الإصدار">
        <ScrollAreaContent>
          <p className={styles.wideParagraph}>
            تدعم منطقة التمرير اتجاه النص من اليمين إلى اليسار مع الحفاظ على التمرير الأصلي وأجزاء
            شريط التمرير القابلة للتخصيص.
          </p>
        </ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar orientation="horizontal">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollArea>
  ),
};

export const BothDirections: Story = {
  name: 'Both Directions',
  render: () => (
    <ScrollArea className={styles.root}>
      <ScrollAreaViewport>
        <ScrollAreaContent>
          <div className={styles.gridContent}>
            {Array.from({ length: 96 }, (_, index) => (
              <div key={index} className={styles.cell}>
                {index + 1}
              </div>
            ))}
          </div>
        </ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar>
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaScrollbar orientation="horizontal">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollArea>
  ),
};

export const Nested: Story = {
  render: () => (
    <ScrollArea className={styles.root}>
      <ScrollAreaViewport>
        <ScrollAreaContent>
          <div className={styles.textContent}>
            <section>
              <h3>Outer release notes</h3>
              <p className={styles.paragraph}>{insideScrollSections[0]?.body}</p>
            </section>
            <VerticalScrollArea />
            <section>
              <h3>Follow-up items</h3>
              <p className={styles.paragraph}>{insideScrollSections[1]?.body}</p>
            </section>
          </div>
        </ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar>
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollArea>
  ),
};

export const RootProvider: Story = {
  name: 'Root Provider',
  render: () => <RootProviderStory />,
};