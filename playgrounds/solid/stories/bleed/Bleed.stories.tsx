import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Bleed } from '@/components/bleed/Bleed';
import { Text } from '@/components/text';
import storyStyles from './Bleed.stories.module.css';

const meta = {
  title: 'Components/Bleed',
  component: Bleed,
  parameters: {
    layout: 'centered',
  },
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
  },
} satisfies Meta<typeof Bleed>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <div class={storyStyles.container}>
      <Text tone="muted">Container content stays constrained.</Text>
      <Bleed {...args} class={storyStyles.bleed}>
        <Text weight="semibold">This block bleeds to the viewport edges.</Text>
      </Bleed>
      <Text tone="muted">Following content returns to the container width.</Text>
    </div>
  ),
};

export const BlockBleed: Story = {
  render: () => (
    <div class={storyStyles.paddedContainer}>
      <Text tone="muted">Container padding above.</Text>
      <Bleed inline="md" block="md" class={storyStyles.panel}>
        <Text>Inline and block bleed</Text>
      </Bleed>
      <Text tone="muted">Container padding below.</Text>
    </div>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div class={storyStyles.container}>
      <Bleed class={storyStyles.customBleed}>
        <Text weight="semibold">Customized bleed amount.</Text>
      </Bleed>
    </div>
  ),
};

export const InlineAmounts: Story = {
  render: () => (
    <div class={storyStyles.container}>
      <Bleed inline="sm" class={storyStyles.panel}>
        <Text>Small inline bleed</Text>
      </Bleed>
      <Bleed inline="lg" class={storyStyles.panel}>
        <Text>Large inline bleed</Text>
      </Bleed>
      <Bleed inline="full" class={storyStyles.panel}>
        <Text>Full inline bleed</Text>
      </Bleed>
    </div>
  ),
};

export const SemanticElement: Story = {
  render: () => (
    <div class={storyStyles.container}>
      <Bleed
        asChild={(props) => (
          <figure {...props({ class: storyStyles.figure })}>
            <div class={storyStyles.media} />
            <Text tone="muted" size="sm">
              Full-width media with a constrained parent.
            </Text>
          </figure>
        )}
      />
    </div>
  ),
};