import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent } from 'vue';
import { Bleed } from '@/components/bleed';
import { Container } from '@/components/container';
import { Text } from '@/components/text';
import styles from './Container.stories.module.css';

const meta = {
  title: 'Components/Container',
  component: Container,
  tags: ['autodocs'],
  argTypes: {
    asChild: {
      control: false,
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Container>;

export default meta;

type Story = StoryObj<typeof meta>;

const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'full'] as const;
const gutters = ['none', 'sm', 'md', 'lg'] as const;
const storyComponents = { Bleed, Container, Text };

function renderStory(template: string) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return { gutters, sizes, styles };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory(`
    <Container :class="styles.container">
      <Text weight="semibold">Responsive content column</Text>
      <Text tone="muted">The declared size controls the readable content width. Gutters stay fluid near viewport edges.</Text>
    </Container>
  `),
};

export const Sizes: Story = {
  render: renderStory(`
    <div :class="styles.stack">
      <Container v-for="size in sizes" :key="size" :size="size" :class="styles.container">
        <Text weight="semibold">size="{{ size }}"</Text>
      </Container>
    </div>
  `),
};

export const Gutters: Story = {
  render: renderStory(`
    <div :class="styles.stack">
      <Container v-for="gutter in gutters" :key="gutter" :gutter="gutter" :class="styles.container">
        <Text weight="semibold">gutter="{{ gutter }}"</Text>
      </Container>
    </div>
  `),
};

export const SemanticElement: Story = {
  render: renderStory(`
    <Container as-child size="md" :class="styles.container">
      <main>
        <Text weight="semibold">Rendered as main</Text>
        <Text tone="muted">Use asChild when the layout wrapper also carries page semantics.</Text>
      </main>
    </Container>
  `),
};

export const WithBleed: Story = {
  render: renderStory(`
    <Container :class="styles.container">
      <Text weight="semibold">Constrained text column</Text>
      <Text tone="muted">Use Bleed when media or dividers should extend beyond the readable width.</Text>
      <Bleed inline="md">
        <div :class="styles.bleedSurface">Bleed content escapes the container width.</div>
      </Bleed>
    </Container>
  `),
};