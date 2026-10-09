import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref } from 'vue';
import type { Component } from 'vue';
import {
  SegmentGroup,
  SegmentGroupIndicator,
  SegmentGroupItem,
  SegmentGroupItemControl,
  SegmentGroupItemHiddenInput,
  SegmentGroupItems,
  SegmentGroupItemText,
  SegmentGroupRootProvider,
  useSegmentGroup,
} from '@/components/segment-group';
import styles from './SegmentGroup.stories.module.css';

const meta = {
  title: 'Components/SegmentGroup',
  component: SegmentGroup,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof SegmentGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

const frameworks = ['React', 'Solid', 'Svelte', 'Vue'] as const;
const frameworkItems = frameworks.map((value) => ({ value, label: value }));
const viewItems = ['List', 'Board', 'Calendar'].map((value) => ({ value, label: value }));
const billingCycles = [
  ['Monthly', 'Pay monthly'],
  ['Annual', 'Save 20%'],
] as const;

const segmentGroupComponents = {
  SegmentGroup,
  SegmentGroupIndicator,
  SegmentGroupItem,
  SegmentGroupItemControl,
  SegmentGroupItemHiddenInput,
  SegmentGroupItems,
  SegmentGroupItemText,
  SegmentGroupRootProvider,
} as unknown as Record<string, Component>;

const storyComponents = segmentGroupComponents;

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return { billingCycles, frameworkItems, frameworks, styles, viewItems, ...setup?.() };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory(`
    <SegmentGroup aria-label="Framework" default-value="React">
      <SegmentGroupIndicator />
      <SegmentGroupItems :items="frameworkItems" />
    </SegmentGroup>
  `),
};

export const Controlled: Story = {
  render: renderStory(
    `
      <div :class="styles.stack">
        <SegmentGroup v-model="value" aria-label="Framework">
          <SegmentGroupIndicator />
          <SegmentGroupItems :items="frameworkItems" />
        </SegmentGroup>
        <span :class="styles.hint">Current value: {{ value ?? 'none' }}</span>
      </div>
    `,
    () => ({ value: ref<string | null>('React') }),
  ),
};

export const RootProvider: Story = {
  render: renderStory(
    `
      <div :class="styles.stack">
        <SegmentGroupRootProvider aria-label="Framework" :value="segmentGroup">
          <SegmentGroupIndicator />
          <SegmentGroupItems :items="frameworkItems" />
        </SegmentGroupRootProvider>
        <button :class="styles.button" type="button" @click="segmentGroup.setValue('Solid')">
          Set to Solid
        </button>
      </div>
    `,
    () => ({ segmentGroup: useSegmentGroup({ defaultValue: 'React' }) }),
  ),
};

export const Disabled: Story = {
  render: renderStory(`
    <div :class="styles.stack">
      <SegmentGroup aria-label="Framework with unavailable item" default-value="React">
        <SegmentGroupIndicator />
        <SegmentGroupItems :items="frameworkItems.map((item) => ({ ...item, disabled: item.value === 'Svelte' }))" />
      </SegmentGroup>
      <SegmentGroup aria-label="Disabled framework" default-value="React" disabled>
        <SegmentGroupIndicator />
        <SegmentGroupItems :items="frameworkItems" />
      </SegmentGroup>
    </div>
  `),
};

export const Invalid: Story = {
  render: renderStory(`
    <SegmentGroup aria-label="Framework" name="framework" default-value="React" invalid required>
      <SegmentGroupIndicator />
      <SegmentGroupItems :items="frameworkItems" />
    </SegmentGroup>
  `),
};

export const Vertical: Story = {
  render: renderStory(`
    <SegmentGroup aria-label="View" default-value="List" orientation="vertical" :class="styles.vertical">
      <SegmentGroupIndicator />
      <SegmentGroupItems :items="viewItems" />
    </SegmentGroup>
  `),
};

export const CustomStyling: Story = {
  render: renderStory(`
    <SegmentGroup aria-label="Framework" default-value="React" :class="styles.customRoot">
      <SegmentGroupIndicator />
      <SegmentGroupItem v-for="item in frameworks" :key="item" :value="item" :class="styles.customItem">
        <SegmentGroupItemText>{{ item }}</SegmentGroupItemText>
        <SegmentGroupItemControl />
        <SegmentGroupItemHiddenInput />
      </SegmentGroupItem>
    </SegmentGroup>
  `),
};

export const AsChild: Story = {
  render: renderStory(`
    <SegmentGroup aria-label="Billing cycle" default-value="Monthly">
      <SegmentGroupIndicator />
      <SegmentGroupItem
        v-for="([item, description]) in billingCycles"
        :key="item"
        :value="item"
        as-child
      >
        <label :class="styles.cardItem">
          <SegmentGroupItemText :class="styles.cardTitle">{{ item }}</SegmentGroupItemText>
          <span :class="styles.cardDescription">{{ description }}</span>
          <SegmentGroupItemControl />
          <SegmentGroupItemHiddenInput />
        </label>
      </SegmentGroupItem>
    </SegmentGroup>
  `),
};