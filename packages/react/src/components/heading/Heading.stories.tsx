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

export const Default: Story = {};

export const Levels: Story = {
  render: () => (
    <div className={storyStyles.stack}>
      <Heading>Heading level 1</Heading>
      <Heading asChild>
        <h2>Heading level 2</h2>
      </Heading>
      <Heading asChild>
        <h3>Heading level 3</h3>
      </Heading>
      <Heading asChild>
        <h4>Heading level 4</h4>
      </Heading>
      <Heading asChild>
        <h5>Heading level 5</h5>
      </Heading>
      <Heading asChild>
        <h6>Heading level 6</h6>
      </Heading>
    </div>
  ),
};

export const SemanticLevel: Story = {
  render: () => (
    <Heading asChild size="2xl">
      <h2>Page title rendered as h2</h2>
    </Heading>
  ),
};

export const VisualSizes: Story = {
  render: () => (
    <div className={storyStyles.stack}>
      <Heading asChild size="2xl">
        <h2>Extra-large heading</h2>
      </Heading>
      <Heading asChild size="xl">
        <h2>Large heading</h2>
      </Heading>
      <Heading asChild size="lg">
        <h2>Medium-large heading</h2>
      </Heading>
      <Heading asChild size="md">
        <h2>Medium heading</h2>
      </Heading>
      <Heading asChild size="sm">
        <h2>Small heading</h2>
      </Heading>
      <Heading asChild size="xs">
        <h2>Extra-small heading</h2>
      </Heading>
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div className={storyStyles.stack}>
      <Heading asChild weight="regular">
        <h2>Regular weight</h2>
      </Heading>
      <Heading asChild weight="medium">
        <h2>Medium weight</h2>
      </Heading>
      <Heading asChild weight="semibold">
        <h2>Semibold weight</h2>
      </Heading>
      <Heading asChild weight="bold">
        <h2>Bold weight</h2>
      </Heading>
    </div>
  ),
};

export const CustomStyles: Story = {
  render: () => (
    <Heading asChild className={storyStyles.customHeading}>
      <h2>Customized heading</h2>
    </Heading>
  ),
};