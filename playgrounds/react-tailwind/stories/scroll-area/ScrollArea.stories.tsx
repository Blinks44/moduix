import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/button/Button';
import { ScrollArea, ScrollAreaContent, ScrollAreaCorner, ScrollAreaRootProvider, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport, useScrollArea } from '@/components/scroll-area/ScrollArea';
import { insideScrollSections } from '../data/insideScrollSections';

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

const rootClassName = 'h-52 w-96 max-w-[calc(100vw-2rem)] rounded-lg border border-border';
const horizontalRootClassName =
  'h-auto w-96 max-w-[calc(100vw-2rem)] rounded-lg border border-border';
const textContentClassName = 'grid gap-3 p-3 pr-6';
const paragraphClassName = 'text-sm text-foreground';
const wideParagraphClassName = 'w-200 p-3 pb-6 text-sm text-foreground';
const gridContentClassName =
  'grid w-max grid-cols-[repeat(12,5rem)] grid-rows-[repeat(8,5rem)] gap-2 p-3';
const cellClassName =
  'grid place-items-center rounded-sm bg-muted text-sm font-medium text-foreground';
const providerStackClassName = 'grid gap-3';
const actionsClassName = 'flex justify-end gap-2';

function TextContent() {
  return (
    <div className={textContentClassName}>
      {insideScrollSections.map((item) => (
        <section key={item.title}>
          <h3>{item.title}</h3>
          <p className={paragraphClassName}>{item.body}</p>
        </section>
      ))}
    </div>
  );
}

function VerticalScrollArea() {
  return (
    <ScrollArea className={rootClassName}>
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
    <div className={providerStackClassName}>
      <div className={actionsClassName}>
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
      <ScrollAreaRootProvider value={scrollArea} className={rootClassName}>
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
    <ScrollArea className={rootClassName} variant="always">
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
    <ScrollArea className={rootClassName} fade>
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
    <ScrollArea className={horizontalRootClassName}>
      <ScrollAreaViewport>
        <ScrollAreaContent>
          <p className={wideParagraphClassName}>{insideScrollSections[0]?.body}</p>
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
    <ScrollArea className={horizontalRootClassName} dir="rtl" variant="always">
      <ScrollAreaViewport aria-label="ملاحظات الإصدار">
        <ScrollAreaContent>
          <p className={wideParagraphClassName}>
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
    <ScrollArea className={rootClassName}>
      <ScrollAreaViewport>
        <ScrollAreaContent>
          <div className={gridContentClassName}>
            {Array.from({ length: 96 }, (_, index) => (
              <div key={index} className={cellClassName}>
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
    <ScrollArea className={rootClassName}>
      <ScrollAreaViewport>
        <ScrollAreaContent>
          <div className={textContentClassName}>
            <section>
              <h3>Outer release notes</h3>
              <p className={paragraphClassName}>{insideScrollSections[0]?.body}</p>
            </section>
            <VerticalScrollArea />
            <section>
              <h3>Follow-up items</h3>
              <p className={paragraphClassName}>{insideScrollSections[1]?.body}</p>
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