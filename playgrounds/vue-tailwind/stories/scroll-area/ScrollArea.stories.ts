import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent } from 'vue';
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
} from '@/components/scroll-area';
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
const gridItems = Array.from({ length: 96 }, (_, index) => index + 1);

const TextContent = defineComponent({
  setup() {
    return { insideScrollSections, paragraphClass, textContentClass };
  },
  template: `
    <div :class="textContentClass">
      <section v-for="item in insideScrollSections" :key="item.title">
        <h3>{{ item.title }}</h3>
        <p :class="paragraphClass">{{ item.body }}</p>
      </section>
    </div>
  `,
});

const storyComponents = {
  Button,
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaRootProvider,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
  TextContent,
};

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return {
          actionsClass,
          cellClass,
          gridContentClass,
          gridItems,
          horizontalRootClass,
          insideScrollSections,
          paragraphClass,
          providerStackClass,
          rootClass,
          textContentClass,
          wideParagraphClass,
          ...setup?.(),
        };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory(`
    <ScrollArea :class="rootClass">
      <ScrollAreaViewport>
        <ScrollAreaContent><TextContent /></ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollArea>
  `),
};

export const AlwaysVisible: Story = {
  name: 'Always Visible',
  render: renderStory(`
    <ScrollArea :class="rootClass" variant="always">
      <ScrollAreaViewport>
        <ScrollAreaContent><TextContent /></ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollArea>
  `),
};

export const Fade: Story = {
  render: renderStory(`
    <ScrollArea :class="rootClass" fade>
      <ScrollAreaViewport>
        <ScrollAreaContent><TextContent /></ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollArea>
  `),
};

export const Horizontal: Story = {
  render: renderStory(`
    <ScrollArea :class="horizontalRootClass">
      <ScrollAreaViewport>
        <ScrollAreaContent>
          <p :class="wideParagraphClass">{{ insideScrollSections[0]?.body }}</p>
        </ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar orientation="horizontal"><ScrollAreaThumb /></ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollArea>
  `),
};

export const RTL: Story = {
  name: 'RTL',
  render: renderStory(`
    <ScrollArea :class="horizontalRootClass" dir="rtl" variant="always">
      <ScrollAreaViewport aria-label="ملاحظات الإصدار">
        <ScrollAreaContent>
          <p :class="wideParagraphClass">
            تدعم منطقة التمرير اتجاه النص من اليمين إلى اليسار مع الحفاظ على التمرير الأصلي وأجزاء
            شريط التمرير القابلة للتخصيص.
          </p>
        </ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar orientation="horizontal"><ScrollAreaThumb /></ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollArea>
  `),
};

export const BothDirections: Story = {
  name: 'Both Directions',
  render: renderStory(`
    <ScrollArea :class="rootClass">
      <ScrollAreaViewport>
        <ScrollAreaContent>
          <div :class="gridContentClass">
            <div v-for="item in gridItems" :key="item" :class="cellClass">{{ item }}</div>
          </div>
        </ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar>
      <ScrollAreaScrollbar orientation="horizontal"><ScrollAreaThumb /></ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollArea>
  `),
};

export const Nested: Story = {
  render: renderStory(`
    <ScrollArea :class="rootClass">
      <ScrollAreaViewport>
        <ScrollAreaContent>
          <div :class="textContentClass">
            <section>
              <h3>Outer release notes</h3>
              <p :class="paragraphClass">{{ insideScrollSections[0]?.body }}</p>
            </section>
            <ScrollArea :class="rootClass">
              <ScrollAreaViewport>
                <ScrollAreaContent><TextContent /></ScrollAreaContent>
              </ScrollAreaViewport>
              <ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar>
              <ScrollAreaCorner />
            </ScrollArea>
            <section>
              <h3>Follow-up items</h3>
              <p :class="paragraphClass">{{ insideScrollSections[1]?.body }}</p>
            </section>
          </div>
        </ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollArea>
  `),
};

export const RootProvider: Story = {
  name: 'Root Provider',
  render: renderStory(
    `
      <div :class="providerStackClass">
        <div :class="actionsClass">
          <Button size="sm" variant="outline" @click="scrollArea.scrollToEdge({ edge: 'top' })">Top</Button>
          <Button size="sm" variant="outline" @click="scrollArea.scrollToEdge({ edge: 'bottom' })">Bottom</Button>
        </div>
        <ScrollAreaRootProvider :value="scrollArea" :class="rootClass">
          <ScrollAreaViewport>
            <ScrollAreaContent><TextContent /></ScrollAreaContent>
          </ScrollAreaViewport>
          <ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar>
          <ScrollAreaCorner />
        </ScrollAreaRootProvider>
      </div>
    `,
    () => ({ scrollArea: useScrollArea() }),
  ),
};