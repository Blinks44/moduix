import { For } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Button } from '@/components/button/Button';
import { ScrollArea } from '@/components/scroll-area/ScrollArea';
import { insideScrollSections } from '../../../solid/stories/data/insideScrollSections';

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

const rootClass = 'h-52 w-96 max-w-[calc(100vw-2rem)] rounded-lg border border-border';
const horizontalRootClass = 'h-auto w-96 max-w-[calc(100vw-2rem)] rounded-lg border border-border';
const textContentClass = 'grid gap-3 p-3 pr-6';
const paragraphClass = 'text-sm text-foreground';
const wideParagraphClass = 'w-200 p-3 pb-6 text-sm text-foreground';
const gridContentClass =
  'grid w-max grid-cols-[repeat(12,5rem)] grid-rows-[repeat(8,5rem)] gap-2 p-3';
const cellClass = 'grid place-items-center rounded-sm bg-muted text-sm font-medium text-foreground';
const providerStackClass = 'grid gap-3';
const actionsClass = 'flex justify-end gap-2';

function TextContent() {
  return (
    <div class={textContentClass}>
      <For each={insideScrollSections}>
        {(item) => (
          <section>
            <h3>{item.title}</h3>
            <p class={paragraphClass}>{item.body}</p>
          </section>
        )}
      </For>
    </div>
  );
}

function VerticalScrollArea() {
  return (
    <ScrollArea class={rootClass}>
      <ScrollArea.Viewport>
        <ScrollArea.Content>
          <TextContent />
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar>
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea>
  );
}

function RootProviderStory() {
  const scrollArea = ScrollArea.useScrollArea();

  return (
    <div class={providerStackClass}>
      <div class={actionsClass}>
        <Button
          size="sm"
          variant="outline"
          onClick={() => scrollArea().scrollToEdge({ edge: 'top' })}
        >
          Top
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => scrollArea().scrollToEdge({ edge: 'bottom' })}
        >
          Bottom
        </Button>
      </div>
      <ScrollArea.RootProvider value={scrollArea} class={rootClass}>
        <ScrollArea.Viewport>
          <ScrollArea.Content>
            <TextContent />
          </ScrollArea.Content>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar>
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner />
      </ScrollArea.RootProvider>
    </div>
  );
}

export const Basic: Story = {
  render: () => <VerticalScrollArea />,
};

export const AlwaysVisible: Story = {
  name: 'Always Visible',
  render: () => (
    <ScrollArea class={rootClass} variant="always">
      <ScrollArea.Viewport>
        <ScrollArea.Content>
          <TextContent />
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar>
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea>
  ),
};

export const Fade: Story = {
  render: () => (
    <ScrollArea class={rootClass} fade>
      <ScrollArea.Viewport>
        <ScrollArea.Content>
          <TextContent />
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar>
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <ScrollArea class={horizontalRootClass}>
      <ScrollArea.Viewport>
        <ScrollArea.Content>
          <p class={wideParagraphClass}>{insideScrollSections[0]?.body}</p>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="horizontal">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea>
  ),
};

export const RTL: Story = {
  name: 'RTL',
  render: () => (
    <ScrollArea class={horizontalRootClass} dir="rtl" variant="always">
      <ScrollArea.Viewport aria-label="ملاحظات الإصدار">
        <ScrollArea.Content>
          <p class={wideParagraphClass}>
            تدعم منطقة التمرير اتجاه النص من اليمين إلى اليسار مع الحفاظ على التمرير الأصلي وأجزاء
            شريط التمرير القابلة للتخصيص.
          </p>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="horizontal">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea>
  ),
};

export const BothDirections: Story = {
  name: 'Both Directions',
  render: () => (
    <ScrollArea class={rootClass}>
      <ScrollArea.Viewport>
        <ScrollArea.Content>
          <div class={gridContentClass}>
            <For each={Array.from({ length: 96 }, (_, index) => index + 1)}>
              {(item) => <div class={cellClass}>{item}</div>}
            </For>
          </div>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar>
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar orientation="horizontal">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea>
  ),
};

export const Nested: Story = {
  render: () => (
    <ScrollArea class={rootClass}>
      <ScrollArea.Viewport>
        <ScrollArea.Content>
          <div class={textContentClass}>
            <section>
              <h3>Outer release notes</h3>
              <p class={paragraphClass}>{insideScrollSections[0]?.body}</p>
            </section>
            <VerticalScrollArea />
            <section>
              <h3>Follow-up items</h3>
              <p class={paragraphClass}>{insideScrollSections[1]?.body}</p>
            </section>
          </div>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar>
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea>
  ),
};

export const RootProvider: Story = {
  name: 'Root Provider',
  render: () => <RootProviderStory />,
};