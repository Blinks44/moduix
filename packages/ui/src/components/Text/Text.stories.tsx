import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from './Text';
import storyStyles from './Text.stories.module.css';

const meta = {
  title: 'Components/Text',
  component: Text,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'Use text to describe interface state, content, and supporting details.',
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Elements: Story = {
  render: () => (
    <div className={storyStyles.stack}>
      <Text as="p">Paragraph text rendered as p.</Text>
      <Text as="span">Inline text rendered as span.</Text>
      <Text as="small">Small supporting text rendered as small.</Text>
      <Text as="strong">Important text rendered as strong.</Text>
      <Text as="em">Emphasized text rendered as em.</Text>
      <Text as="div">Block text rendered as div.</Text>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className={storyStyles.stack}>
      <Text size="xl">Extra-large text</Text>
      <Text size="lg">Large text</Text>
      <Text size="md">Medium text</Text>
      <Text size="sm">Small text</Text>
      <Text size="xs">Extra-small text</Text>
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div className={storyStyles.stack}>
      <Text tone="default">Default tone</Text>
      <Text tone="muted">Muted tone</Text>
      <Text tone="subtle">Subtle tone</Text>
      <Text tone="primary">Primary tone</Text>
      <Text tone="destructive">Destructive tone</Text>
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div className={storyStyles.stack}>
      <Text weight="regular">Regular weight</Text>
      <Text weight="medium">Medium weight</Text>
      <Text weight="semibold">Semibold weight</Text>
      <Text weight="bold">Bold weight</Text>
    </div>
  ),
};

export const Aligned: Story = {
  render: () => (
    <div className={storyStyles.aligned}>
      <Text align="left">Left aligned text.</Text>
      <Text align="center">Center aligned text.</Text>
      <Text align="right">Right aligned text.</Text>
    </div>
  ),
};