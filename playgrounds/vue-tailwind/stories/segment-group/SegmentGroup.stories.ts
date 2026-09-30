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
const stackClass = 'grid justify-items-start gap-2';
const hintClass = 'text-xs leading-4 text-muted-foreground';
const buttonClass =
  'inline-flex min-h-8 cursor-pointer items-center justify-center rounded-md border border-border bg-background px-3 text-foreground transition-[background-color,border-color] duration-200 ease-in-out hover:bg-accent focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-ring';
const cardItemClass =
  'group/segment-item grid min-h-18 w-36 content-center justify-items-start gap-0.5 p-3 whitespace-normal';
const cardDescriptionClass =
  'relative z-1 text-xs leading-4 text-muted-foreground group-data-[state=checked]/segment-item:text-foreground';

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

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: segmentGroupComponents,
      setup() {
        return {
          billingCycles,
          buttonClass,
          cardDescriptionClass,
          cardItemClass,
          frameworkItems,
          frameworks,
          hintClass,
          stackClass,
          viewItems,
          ...setup?.(),
        };
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
      <div :class="stackClass">
        <SegmentGroup v-model="value" aria-label="Framework">
          <SegmentGroupIndicator />
          <SegmentGroupItems :items="frameworkItems" />
        </SegmentGroup>
        <span :class="hintClass">Current value: {{ value ?? 'none' }}</span>
      </div>
    `,
    () => ({ value: ref<string | null>('React') }),
  ),
};

export const RootProvider: Story = {
  render: renderStory(
    `
      <div :class="stackClass">
        <SegmentGroupRootProvider aria-label="Framework" :value="segmentGroup">
          <SegmentGroupIndicator />
          <SegmentGroupItems :items="frameworkItems" />
        </SegmentGroupRootProvider>
        <button :class="buttonClass" type="button" @click="segmentGroup.setValue('Solid')">
          Set to Solid
        </button>
      </div>
    `,
    () => ({ segmentGroup: useSegmentGroup({ defaultValue: 'React' }) }),
  ),
};

export const Disabled: Story = {
  render: renderStory(`
    <div :class="stackClass">
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
    <SegmentGroup aria-label="View" default-value="List" orientation="vertical" class="min-w-40">
      <SegmentGroupIndicator />
      <SegmentGroupItems :items="viewItems" />
    </SegmentGroup>
  `),
};

export const CustomStyling: Story = {
  render: renderStory(`
    <SegmentGroup aria-label="Framework" default-value="React" class="border-primary bg-background">
      <SegmentGroupIndicator class="bg-primary" />
      <SegmentGroupItem
        v-for="item in frameworks"
        :key="item"
        :value="item"
        class="data-[state=checked]:text-primary-foreground"
      >
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
        <label :class="cardItemClass">
          <SegmentGroupItemText class="font-semibold">{{ item }}</SegmentGroupItemText>
          <span :class="cardDescriptionClass">{{ description }}</span>
          <SegmentGroupItemControl />
          <SegmentGroupItemHiddenInput />
        </label>
      </SegmentGroupItem>
    </SegmentGroup>
  `),
};