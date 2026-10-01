import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref } from 'vue';
import {
  Toc,
  TocContent,
  TocIndicator,
  TocItem,
  TocLink,
  TocList,
  TocNav,
  TocRail,
  TocRootProvider,
  TocTitle,
  useToc,
} from '@/components/toc';

const items = [
  { value: 'toc-story-introduction', depth: 2, label: 'Introduction' },
  { value: 'toc-story-installation', depth: 2, label: 'Installation' },
  { value: 'toc-story-configuration', depth: 3, label: 'Configuration' },
  { value: 'toc-story-usage', depth: 2, label: 'Usage' },
];

const contentClass =
  'grid h-[26rem] gap-3 overflow-y-auto overscroll-contain rounded-md border border-border p-3';
const sectionClass = 'rounded-md border border-border p-3';

const paragraphs = [
  'Track the reader inside this scrollable pane instead of the document viewport.',
  'Heading values, IDs, and anchor hashes remain identical for reliable navigation.',
  'Nested headings use the semantic depth supplied to the same item collection.',
];

const storyComponents = {
  Toc,
  TocContent,
  TocIndicator,
  TocItem,
  TocLink,
  TocList,
  TocNav,
  TocRail,
  TocRootProvider,
  TocTitle,
};

const TocExample = defineComponent({
  components: storyComponents,
  props: {
    placement: { type: String, default: undefined },
    withRail: Boolean,
  },
  setup() {
    const scrollRef = ref<HTMLDivElement | null>(null);
    const scrollEl = () => scrollRef.value;

    return { contentClass, items, paragraphs, scrollEl, scrollRef, sectionClass };
  },
  template: `
    <Toc :items="items" :scroll-el="scrollEl">
      <TocContent>
        <div ref="scrollRef" aria-label="Scrollable document preview" :class="contentClass" tabindex="0">
          <section v-for="item in items" :key="item.value" :class="placement === 'left' ? undefined : sectionClass">
            <component :is="item.depth === 2 ? 'h2' : 'h3'" :id="item.value">{{ item.label }}</component>
            <p v-for="paragraph in paragraphs" :key="paragraph">{{ paragraph }}</p>
          </section>
        </div>
      </TocContent>

      <TocNav :placement="placement">
        <TocTitle>On this page</TocTitle>
        <TocList>
          <TocIndicator v-if="!withRail" />
          <TocItem v-for="(item, index) in items" :key="item.value" :item="item">
            <TocLink :href="\`#\${item.value}\`">
              <TocRail
                v-if="withRail"
                :depth="item.depth"
                :previous-depth="items[index - 1]?.depth"
                :next-depth="items[index + 1]?.depth"
              />
              {{ item.label }}
            </TocLink>
          </TocItem>
        </TocList>
      </TocNav>
    </Toc>
  `,
});

const RootProviderExample = defineComponent({
  components: storyComponents,
  setup() {
    const scrollRef = ref<HTMLDivElement | null>(null);
    const scrollEl = () => scrollRef.value;
    const toc = useToc({
      items,
      defaultActiveIds: ['toc-story-installation'],
      scrollEl,
    });

    return { contentClass, items, paragraphs, scrollEl, scrollRef, sectionClass, toc };
  },
  template: `
    <TocRootProvider :value="toc">
      <TocContent>
        <div ref="scrollRef" aria-label="Scrollable document preview" :class="contentClass" tabindex="0">
          <section v-for="item in items" :key="item.value">
            <component :is="item.depth === 2 ? 'h2' : 'h3'" :id="item.value">{{ item.label }}</component>
            <p v-for="paragraph in paragraphs" :key="paragraph">{{ paragraph }}</p>
          </section>
        </div>
      </TocContent>
      <TocNav>
        <TocTitle>On this page</TocTitle>
        <TocList>
          <TocIndicator />
          <TocItem v-for="item in items" :key="item.value" :item="item">
            <TocLink :href="\`#\${item.value}\`">{{ item.label }}</TocLink>
          </TocItem>
        </TocList>
      </TocNav>
    </TocRootProvider>
  `,
});

const meta = {
  title: 'Components/Table of Contents',
  component: Toc,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    items: [],
  },
} satisfies Meta<typeof Toc>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({ components: { TocExample }, template: '<TocExample />' }),
};

export const WithRail: Story = {
  render: () => ({ components: { TocExample }, template: '<TocExample with-rail />' }),
};

export const LeftPlacement: Story = {
  render: () => ({
    components: { TocExample },
    template: '<TocExample placement="left" />',
  }),
};

export const RootProvider: Story = {
  render: () => ({ components: { RootProviderExample }, template: '<RootProviderExample />' }),
};