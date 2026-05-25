import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '../Text';
import { Bleed } from './Bleed';
import storyStyles from './Bleed.stories.module.css';

const meta = {
  title: 'Components/Bleed',
  component: Bleed,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Bleed>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <div className={storyStyles.container}>
      <Text tone="muted">Container content stays constrained.</Text>
      <Bleed className={storyStyles.bleed}>
        <Text weight="semibold">This block bleeds to the viewport edges.</Text>
      </Bleed>
      <Text tone="muted">Following content returns to the container width.</Text>
    </div>
  ),
};

export const InlineAmounts: Story = {
  render: () => (
    <div className={storyStyles.container}>
      <Bleed inline="sm" className={storyStyles.panel}>
        <Text>Small inline bleed</Text>
      </Bleed>
      <Bleed inline="lg" className={storyStyles.panel}>
        <Text>Large inline bleed</Text>
      </Bleed>
      <Bleed inline="full" className={storyStyles.panel}>
        <Text>Full inline bleed</Text>
      </Bleed>
    </div>
  ),
};

export const SemanticElement: Story = {
  render: () => (
    <div className={storyStyles.container}>
      <Bleed as="figure" className={storyStyles.figure}>
        <div className={storyStyles.media} />
        <Text tone="muted" size="sm">
          Full-width media with a constrained parent.
        </Text>
      </Bleed>
    </div>
  ),
};

export const BlockBleed: Story = {
  render: () => (
    <div className={storyStyles.paddedContainer}>
      <Text tone="muted">Container padding above.</Text>
      <Bleed inline="md" block="md" className={storyStyles.panel}>
        <Text>Inline and block bleed</Text>
      </Bleed>
      <Text tone="muted">Container padding below.</Text>
    </div>
  ),
};

export const CustomStyles: Story = {
  render: () => (
    <div className={storyStyles.container}>
      <Bleed className={storyStyles.customBleed}>
        <Text weight="semibold">Customized bleed amount.</Text>
      </Bleed>
    </div>
  ),
};