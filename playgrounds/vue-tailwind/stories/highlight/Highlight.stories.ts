import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent } from 'vue';
import { Highlight } from '@/components/highlight';
import { Text } from '@/components/text';
import HighlightDynamicQuery from './HighlightDynamicQuery.vue';

const comparisonClass = 'grid gap-2';
const labelClass =
  'text-xs leading-4 font-medium tracking-[0.04em] text-muted-foreground uppercase';
const customClass = 'bg-primary/18 font-semibold text-primary';

const meta = {
  title: 'Utilities/Highlight',
  component: Highlight,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    query: 'component',
    text: 'Ark UI is a headless component library for building accessible web applications.',
  },
} satisfies Meta<typeof Highlight>;

export default meta;

type Story = StoryObj<typeof meta>;

const storyComponents = {
  Highlight,
  Text,
};

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return { ...setup?.() };
      },
      template,
    });
}

export const Basic: Story = {
  render: (args) => renderStory('<Text><Highlight v-bind="args" /></Text>', () => ({ args }))(),
};

export const DynamicQuery: Story = {
  render: () =>
    defineComponent({
      components: { HighlightDynamicQuery },
      template: '<HighlightDynamicQuery />',
    }),
};

export const MultipleQueries: Story = {
  render: renderStory(`
    <Text>
      <Highlight
        :query="['React', 'Vue']"
        text="Ark UI provides React, Solid, Vue, and Svelte components that are accessible and customizable."
      />
    </Text>
  `),
};

export const IgnoreCase: Story = {
  render: renderStory(`
    <Text>
      <Highlight
        ignore-case
        query="typescript"
        text="TypeScript provides static type checking. Using typescript helps catch errors early in development."
      />
    </Text>
  `),
};

export const MatchAll: Story = {
  render: renderStory(`
    <div class="${comparisonClass}">
      <div>
        <div class="${labelClass}">Match all</div>
        <Text>
          <Highlight
            match-all
            query="component"
            text="Each component follows WAI-ARIA guidelines. Every component is rigorously tested to ensure accessibility."
          />
        </Text>
      </div>
      <div>
        <div class="${labelClass}">First match only</div>
        <Text>
          <Highlight
            :match-all="false"
            query="component"
            text="Each component follows WAI-ARIA guidelines. Every component is rigorously tested to ensure accessibility."
          />
        </Text>
      </div>
    </div>
  `),
};

export const ExactMatch: Story = {
  render: renderStory(`
    <div class="${comparisonClass}">
      <div>
        <div class="${labelClass}">Partial match</div>
        <Text>
          <Highlight
            match-all
            query="box"
            text="The checkbox component renders a box element. Use combobox for autocomplete."
          />
        </Text>
      </div>
      <div>
        <div class="${labelClass}">Exact match</div>
        <Text>
          <Highlight
            exact-match
            match-all
            query="box"
            text="The checkbox component renders a box element. Use combobox for autocomplete."
          />
        </Text>
      </div>
    </div>
  `),
};

export const CustomStyling: Story = {
  render: renderStory(`
    <Text>
      <Highlight
        class="${customClass}"
        query="moduix"
        text="moduix keeps highlight styling aligned with the rest of the component library."
      />
    </Text>
  `),
};