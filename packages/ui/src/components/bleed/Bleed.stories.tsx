import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '../text';
import { Bleed } from './Bleed';
import storyStyles from './Bleed.stories.module.css';

const meta = {
  title: 'Components/Bleed',
  component: Bleed.Root,
  tags: ['autodocs'],
  args: {
    inline: 'full',
    block: 'none',
  },
  argTypes: {
    inline: {
      control: 'inline-radio',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'],
    },
    block: {
      control: 'inline-radio',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    asChild: {
      control: 'boolean',
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Bleed.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <div className={storyStyles.container}>
      <Text tone="muted">Container content stays constrained.</Text>
      <Bleed.Root {...args} className={storyStyles.bleed}>
        <Text weight="semibold">This block bleeds to the viewport edges.</Text>
      </Bleed.Root>
      <Text tone="muted">Following content returns to the container width.</Text>
    </div>
  ),
};

export const InlineAmounts: Story = {
  render: () => (
    <div className={storyStyles.container}>
      <Bleed.Root inline="sm" className={storyStyles.panel}>
        <Text>Small inline bleed</Text>
      </Bleed.Root>
      <Bleed.Root inline="lg" className={storyStyles.panel}>
        <Text>Large inline bleed</Text>
      </Bleed.Root>
      <Bleed.Root inline="full" className={storyStyles.panel}>
        <Text>Full inline bleed</Text>
      </Bleed.Root>
    </div>
  ),
};

export const SemanticElement: Story = {
  render: () => (
    <div className={storyStyles.container}>
      <Bleed.Root asChild className={storyStyles.figure}>
        <figure>
          <div className={storyStyles.media} />
          <Text tone="muted" size="sm">
            Full-width media with a constrained parent.
          </Text>
        </figure>
      </Bleed.Root>
    </div>
  ),
};

export const BlockBleed: Story = {
  render: () => (
    <div className={storyStyles.paddedContainer}>
      <Text tone="muted">Container padding above.</Text>
      <Bleed.Root inline="md" block="md" className={storyStyles.panel}>
        <Text>Inline and block bleed</Text>
      </Bleed.Root>
      <Text tone="muted">Container padding below.</Text>
    </div>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div className={storyStyles.container}>
      <Bleed.Root className={storyStyles.customBleed}>
        <Text weight="semibold">Customized bleed amount.</Text>
      </Bleed.Root>
    </div>
  ),
};