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

const gridItems = Array.from({ length: 96 }, (_, index) => index + 1);

const TextContent = defineComponent({
  setup() {
    return { insideScrollSections, styles };
  },
  template: `
    <div :class="styles.textContent">
      <section v-for="item in insideScrollSections" :key="item.title">
        <h3>{{ item.title }}</h3>
        <p :class="styles.paragraph">{{ item.body }}</p>
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
        return { gridItems, insideScrollSections, styles, ...setup?.() };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory(`
    <ScrollArea :class="styles.root">
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
    <ScrollArea :class="styles.root" variant="always">
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
    <ScrollArea :class="styles.root" fade>
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
    <ScrollArea :class="styles.horizontalRoot">
      <ScrollAreaViewport>
        <ScrollAreaContent>
          <p :class="styles.wideParagraph">{{ insideScrollSections[0]?.body }}</p>
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
    <ScrollArea :class="styles.horizontalRoot" dir="rtl" variant="always">
      <ScrollAreaViewport aria-label="ملاحظات الإصدار">
        <ScrollAreaContent>
          <p :class="styles.wideParagraph">
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
    <ScrollArea :class="styles.root">
      <ScrollAreaViewport>
        <ScrollAreaContent>
          <div :class="styles.gridContent">
            <div v-for="item in gridItems" :key="item" :class="styles.cell">{{ item }}</div>
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
    <ScrollArea :class="styles.root">
      <ScrollAreaViewport>
        <ScrollAreaContent>
          <div :class="styles.textContent">
            <section>
              <h3>Outer release notes</h3>
              <p :class="styles.paragraph">{{ insideScrollSections[0]?.body }}</p>
            </section>
            <ScrollArea :class="styles.root">
              <ScrollAreaViewport>
                <ScrollAreaContent><TextContent /></ScrollAreaContent>
              </ScrollAreaViewport>
              <ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar>
              <ScrollAreaCorner />
            </ScrollArea>
            <section>
              <h3>Follow-up items</h3>
              <p :class="styles.paragraph">{{ insideScrollSections[1]?.body }}</p>
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
      <div :class="styles.providerStack">
        <div :class="styles.actions">
          <Button size="sm" variant="outline" @click="scrollArea.scrollToEdge({ edge: 'top' })">Top</Button>
          <Button size="sm" variant="outline" @click="scrollArea.scrollToEdge({ edge: 'bottom' })">Bottom</Button>
        </div>
        <ScrollAreaRootProvider :value="scrollArea" :class="styles.root">
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