import { AlignCenter, AlignLeft, AlignRight, Bell, Star } from '@lucide/vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref } from 'vue';
import type { Component } from 'vue';
import {
  ToggleGroup,
  ToggleGroupContext,
  ToggleGroupItem,
  ToggleGroupRootProvider,
  useToggleGroup,
  useToggleGroupContext,
} from '@/components/toggle-group';
import { CheckIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './ToggleGroup.stories.module.css';

const meta = {
  title: 'Components/ToggleGroup',
  component: ToggleGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    defaultValue: ['left'],
    'aria-label': 'Text alignment',
  },
} satisfies Meta<typeof ToggleGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

const ContextItem = defineComponent({
  props: {
    value: { type: String, required: true },
  },
  setup(props) {
    const toggleGroup = useToggleGroupContext();

    return { toggleGroup, props };
  },
  components: { ToggleGroupItem, CheckIcon },
  template: `
    <ToggleGroupItem :value="props.value">
      <CheckIcon v-if="toggleGroup.value.includes(props.value)" />
      {{ props.value }}
    </ToggleGroupItem>
  `,
});

const storyComponents = {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bell,
  CheckIcon,
  ContextItem,
  Star,
  ToggleGroup,
  ToggleGroupContext,
  ToggleGroupItem,
  ToggleGroupRootProvider,
} as unknown as Record<string, Component>;

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return { styles, ...setup?.() };
      },
      template,
    });
}

export const Default: Story = {
  render: (args) => ({
    components: storyComponents,
    setup: () => ({ args }),
    template: `
      <ToggleGroup v-bind="args">
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="center">Center</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </ToggleGroup>
    `,
  }),
};

export const Multiple: Story = {
  render: renderStory(`
    <ToggleGroup multiple :default-value="['bold', 'italic']" aria-label="Text formatting" size="md">
      <ToggleGroupItem value="bold" aria-label="Bold"><strong>B</strong></ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic"><em>I</em></ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline"><span :class="styles.underline">U</span></ToggleGroupItem>
    </ToggleGroup>
  `),
};

export const Variants: Story = {
  render: renderStory(`
    <div :class="styles.stack">
      <ToggleGroup :default-value="['one']" aria-label="Default variant">
        <ToggleGroupItem value="one">One</ToggleGroupItem>
        <ToggleGroupItem value="two">Two</ToggleGroupItem>
        <ToggleGroupItem value="three">Three</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup :default-value="['one']" aria-label="Outline variant" variant="outline">
        <ToggleGroupItem value="one">One</ToggleGroupItem>
        <ToggleGroupItem value="two">Two</ToggleGroupItem>
        <ToggleGroupItem value="three">Three</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup :default-value="['one']" aria-label="Ghost variant" variant="ghost">
        <ToggleGroupItem value="one">One</ToggleGroupItem>
        <ToggleGroupItem value="two">Two</ToggleGroupItem>
        <ToggleGroupItem value="three">Three</ToggleGroupItem>
      </ToggleGroup>
    </div>
  `),
};

export const Sizes: Story = {
  render: renderStory(`
    <div :class="styles.stack">
      <ToggleGroup :default-value="['xs']" aria-label="Extra small size" size="xs">
        <ToggleGroupItem value="xs">XS</ToggleGroupItem>
        <ToggleGroupItem value="sm">SM</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup :default-value="['sm']" aria-label="Small size" size="sm">
        <ToggleGroupItem value="sm">Small</ToggleGroupItem>
        <ToggleGroupItem value="md">Medium</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup :default-value="['md']" aria-label="Medium size" size="md">
        <ToggleGroupItem value="md">Medium</ToggleGroupItem>
        <ToggleGroupItem value="lg">Large</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup :default-value="['lg']" aria-label="Large size" size="lg">
        <ToggleGroupItem value="lg">Large</ToggleGroupItem>
        <ToggleGroupItem value="xl">Extra</ToggleGroupItem>
      </ToggleGroup>
    </div>
  `),
};

export const WithIcons: Story = {
  render: renderStory(`
    <ToggleGroup :default-value="['favorites']" aria-label="Notification channels">
      <ToggleGroupItem value="favorites"><Star aria-hidden="true" focusable="false" /> Favorites</ToggleGroupItem>
      <ToggleGroupItem value="alerts"><Bell aria-hidden="true" focusable="false" /> Alerts</ToggleGroupItem>
    </ToggleGroup>
  `),
};

export const Vertical: Story = {
  render: renderStory(`
    <ToggleGroup :default-value="['list']" orientation="vertical" aria-label="View mode" variant="outline">
      <ToggleGroupItem value="list">List</ToggleGroupItem>
      <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
      <ToggleGroupItem value="map">Map</ToggleGroupItem>
    </ToggleGroup>
  `),
};

export const Disabled: Story = {
  render: renderStory(`
    <div :class="styles.row">
      <ToggleGroup :default-value="['one']" aria-label="Disabled group" disabled>
        <ToggleGroupItem value="one">One</ToggleGroupItem>
        <ToggleGroupItem value="two">Two</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup :default-value="['one']" aria-label="Disabled item">
        <ToggleGroupItem value="one">One</ToggleGroupItem>
        <ToggleGroupItem value="two" disabled>Two</ToggleGroupItem>
      </ToggleGroup>
    </div>
  `),
};

export const LoopFocus: Story = {
  render: renderStory(`
    <ToggleGroup :default-value="['day']" aria-label="Schedule range" :loop-focus="false">
      <ToggleGroupItem value="day">Day</ToggleGroupItem>
      <ToggleGroupItem value="week">Week</ToggleGroupItem>
      <ToggleGroupItem value="month">Month</ToggleGroupItem>
    </ToggleGroup>
  `),
};

export const Controlled: Story = {
  render: renderStory(
    `
      <div :class="styles.stack">
        <ToggleGroup v-model="value" aria-label="Controlled options" multiple>
          <ToggleGroupItem value="favorites">
            <CheckIcon v-if="value.includes('favorites')" /><Star v-else aria-hidden="true" focusable="false" />
            Favorites
          </ToggleGroupItem>
          <ToggleGroupItem value="alerts"><Bell aria-hidden="true" focusable="false" /> Alerts</ToggleGroupItem>
        </ToggleGroup>
        <span :class="styles.hint">Current value: {{ value.join(', ') || 'empty' }}</span>
      </div>
    `,
    () => ({ value: ref<string[]>(['favorites']) }),
  ),
};

export const RootProvider: Story = {
  name: 'Root Provider',
  render: renderStory(
    `
      <ToggleGroupRootProvider :value="toggleGroup" aria-label="Text alignment">
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="center">Center</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </ToggleGroupRootProvider>
    `,
    () => ({ toggleGroup: useToggleGroup({ defaultValue: ['left'] }) }),
  ),
};

export const Context: Story = {
  render: renderStory(`
    <ToggleGroup :default-value="['left']" aria-label="Text alignment">
      <ContextItem value="left" />
      <ContextItem value="center" />
      <ContextItem value="right" />
    </ToggleGroup>
  `),
};

export const CustomStyles: Story = {
  name: 'Custom Styles',
  render: renderStory(`
    <ToggleGroup :default-value="['day']" aria-label="Schedule density" :class="styles.customGroup">
      <ToggleGroupItem value="day" :class="styles.customItem">Day</ToggleGroupItem>
      <ToggleGroupItem value="week" :class="styles.customItem">Week</ToggleGroupItem>
      <ToggleGroupItem value="month" :class="styles.customItem">Month</ToggleGroupItem>
    </ToggleGroup>
  `),
};