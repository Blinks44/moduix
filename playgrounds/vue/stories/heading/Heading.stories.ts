import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent } from 'vue';
import { Heading } from '@/components/heading';
import styles from './Heading.stories.module.css';

const meta = {
  title: 'Components/Heading',
  component: Heading,
  tags: ['autodocs'],
  argTypes: {
    asChild: {
      control: false,
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Heading>;

export default meta;

type Story = StoryObj<typeof meta>;

function renderStory(template: string) {
  return () =>
    defineComponent({
      components: { Heading },
      setup() {
        return { styles };
      },
      template,
    });
}

export const Default: Story = {
  render: renderStory('<Heading>Build reliable interfaces</Heading>'),
};

export const Levels: Story = {
  render: renderStory(`
    <div :class="styles.stack">
      <Heading>Heading level 1</Heading>
      <Heading as="h2">Heading level 2</Heading>
      <Heading as="h3">Heading level 3</Heading>
      <Heading as="h4">Heading level 4</Heading>
      <Heading as="h5">Heading level 5</Heading>
      <Heading as="h6">Heading level 6</Heading>
    </div>
  `),
};

export const SemanticLevel: Story = {
  render: renderStory('<Heading as="h2" size="2xl">Page title rendered as h2</Heading>'),
};

export const CustomHost: Story = {
  render: renderStory(`
    <Heading as-child size="xl">
      <h2>Factory-composed heading</h2>
    </Heading>
  `),
};

export const VisualSizes: Story = {
  render: renderStory(`
    <div :class="styles.stack">
      <Heading as="h2" size="2xl">Extra-large heading</Heading>
      <Heading as="h2" size="xl">Large heading</Heading>
      <Heading as="h2" size="lg">Medium-large heading</Heading>
      <Heading as="h2" size="md">Medium heading</Heading>
      <Heading as="h2" size="sm">Small heading</Heading>
      <Heading as="h2" size="xs">Extra-small heading</Heading>
    </div>
  `),
};

export const Weights: Story = {
  render: renderStory(`
    <div :class="styles.stack">
      <Heading as="h2" weight="regular">Regular weight</Heading>
      <Heading as="h2" weight="medium">Medium weight</Heading>
      <Heading as="h2" weight="semibold">Semibold weight</Heading>
      <Heading as="h2" weight="bold">Bold weight</Heading>
    </div>
  `),
};

export const CustomStyles: Story = {
  render: renderStory(
    '<Heading as="h2" :class="styles.customHeading">Customized heading</Heading>',
  ),
};