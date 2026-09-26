import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent } from 'vue';
import { Bleed } from '@/components/bleed';
import { Container } from '@/components/container';
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
const storyComponents = { Bleed, Container };

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
      <p><strong>Responsive content column</strong></p>
      <p :class="styles.muted">The declared size controls the readable content width. Gutters stay fluid near viewport edges.</p>
    </Container>
  `),
};

export const Sizes: Story = {
  render: renderStory(`
    <div :class="styles.stack">
      <Container v-for="size in sizes" :key="size" :size="size" :class="styles.container">
        <p><strong>size="{{ size }}"</strong></p>
      </Container>
    </div>
  `),
};

export const Gutters: Story = {
  render: renderStory(`
    <div :class="styles.stack">
      <Container v-for="gutter in gutters" :key="gutter" :gutter="gutter" :class="styles.container">
        <p><strong>gutter="{{ gutter }}"</strong></p>
      </Container>
    </div>
  `),
};

export const SemanticElement: Story = {
  render: renderStory(`
    <Container as-child size="md" :class="styles.container">
      <main>
        <p><strong>Rendered as main</strong></p>
        <p :class="styles.muted">Use asChild when the layout wrapper also carries page semantics.</p>
      </main>
    </Container>
  `),
};

export const WithBleed: Story = {
  render: renderStory(`
    <Container :class="styles.container">
      <p><strong>Constrained text column</strong></p>
      <p :class="styles.muted">Use Bleed when media or dividers should extend beyond the readable width.</p>
      <Bleed inline="md">
        <div :class="styles.bleedSurface">Bleed content escapes the container width.</div>
      </Bleed>
    </Container>
  `),
};