import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heading } from './Heading';
import storyStyles from './Heading.stories.module.css';

const meta = {
  title: 'Components/Heading',
  component: Heading,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'Build reliable interfaces',
  },
} satisfies Meta<typeof Heading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Elements: Story = {
  render: () => (
    <div className={storyStyles.stack}>
      <Heading as="h1">Heading level 1</Heading>
      <Heading as="h2">Heading level 2</Heading>
      <Heading as="h3">Heading level 3</Heading>
      <Heading as="h4">Heading level 4</Heading>
      <Heading as="h5">Heading level 5</Heading>
      <Heading as="h6">Heading level 6</Heading>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className={storyStyles.stack}>
      <Heading as="h2" size="2xl">
        Extra-large heading
      </Heading>
      <Heading as="h2" size="xl">
        Large heading
      </Heading>
      <Heading as="h2" size="lg">
        Medium-large heading
      </Heading>
      <Heading as="h2" size="md">
        Medium heading
      </Heading>
      <Heading as="h2" size="sm">
        Small heading
      </Heading>
      <Heading as="h2" size="xs">
        Extra-small heading
      </Heading>
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div className={storyStyles.stack}>
      <Heading as="h2" weight="regular">
        Regular weight
      </Heading>
      <Heading as="h2" weight="medium">
        Medium weight
      </Heading>
      <Heading as="h2" weight="semibold">
        Semibold weight
      </Heading>
      <Heading as="h2" weight="bold">
        Bold weight
      </Heading>
    </div>
  ),
};

export const SemanticLevelWithVisualSize: Story = {
  name: 'Semantic Level with Visual Size',
  render: () => (
    <Heading as="h2" size="2xl">
      Page title rendered as h2
    </Heading>
  ),
};

export const CustomComposition: Story = {
  name: 'Custom Composition',
  render: () => (
    <Heading as="h2" className={storyStyles.customHeading}>
      Customized heading
    </Heading>
  ),
};