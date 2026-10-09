import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent } from 'vue';
import { Text } from '@/components/text';

const meta = {
  title: 'Components/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

const stackClass = 'flex w-[min(34rem,calc(100vw_-_2rem))] flex-col gap-3';
const alignedClass = 'flex w-[min(34rem,calc(100vw_-_2rem))] flex-col gap-4';
const narrowClass = 'flex w-[min(18rem,calc(100vw_-_2rem))] flex-col gap-4';

function renderStory(template: string) {
  return () =>
    defineComponent({
      components: { Text },
      setup() {
        return { alignedClass, narrowClass, stackClass };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory(
    '<Text>Use text to describe interface state, content, and supporting details.</Text>',
  ),
};

export const Semantics: Story = {
  render: renderStory(`
    <div :class="stackClass">
      <Text>Paragraph text rendered as p.</Text>
      <Text as="span">Inline text rendered as span.</Text>
      <Text as="small" tone="muted">Small supporting text rendered as small.</Text>
      <Text as="strong">Important text rendered as strong.</Text>
      <Text as="em">Emphasized text rendered as em.</Text>
      <Text as="div">Block text rendered as div.</Text>
    </div>
  `),
};

export const CustomElement: Story = {
  name: 'Custom Element',
  render: renderStory(`
    <Text as-child tone="primary" weight="medium">
      <a href="#">Text rendered through a custom link element.</a>
    </Text>
  `),
};

export const Sizes: Story = {
  render: renderStory(`
    <div :class="stackClass">
      <Text size="xl">Extra-large text</Text>
      <Text size="lg">Large text</Text>
      <Text size="md">Medium text</Text>
      <Text size="sm">Small text</Text>
      <Text size="xs">Extra-small text</Text>
    </div>
  `),
};

export const Tones: Story = {
  render: renderStory(`
    <div :class="stackClass">
      <Text tone="default">Default tone</Text>
      <Text tone="muted">Muted tone</Text>
      <Text tone="subtle">Subtle tone</Text>
      <Text tone="primary">Primary tone</Text>
      <Text tone="destructive">Destructive tone</Text>
    </div>
  `),
};

export const Weights: Story = {
  render: renderStory(`
    <div :class="stackClass">
      <Text weight="regular">Regular weight</Text>
      <Text weight="medium">Medium weight</Text>
      <Text weight="semibold">Semibold weight</Text>
      <Text weight="bold">Bold weight</Text>
    </div>
  `),
};

export const Aligned: Story = {
  render: renderStory(`
    <div :class="alignedClass">
      <Text align="start">Start-aligned text.</Text>
      <Text align="center">Center aligned text.</Text>
      <Text align="end">End-aligned text.</Text>
    </div>
  `),
};

export const Truncation: Story = {
  render: renderStory(`
    <div :class="narrowClass">
      <Text truncate>Release notes for the weekly platform update are ready for review.</Text>
      <Text :line-clamp="2">
        Longer interface copy can be clamped when it appears inside dense cards, tables, or constrained previews where the surrounding layout owns disclosure.
      </Text>
    </div>
  `),
};