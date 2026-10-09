import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent } from 'vue';
import { Bleed } from '@/components/bleed';
import { Container } from '@/components/container';

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
const containerClass =
  'border-y border-dashed border-border bg-muted [background-image:linear-gradient(90deg,rgb(0_0_0_/_0.05)_0_1px,transparent_1px)] [background-position:0_0] [background-size:4rem_100%] py-4';
const stackClass = 'flex w-full flex-col gap-4 py-4';
const contentClass = 'max-w-[42rem]';
const storyComponents = { Bleed, Container };

function renderStory(template: string) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return { containerClass, contentClass, gutters, sizes, stackClass };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory(`
    <Container :class="containerClass">
      <p :class="[contentClass, 'font-semibold']">Responsive content column</p>
      <p :class="[contentClass, 'text-muted-foreground']">The declared size controls the readable content width. Gutters stay fluid near viewport edges.</p>
    </Container>
  `),
};

export const Sizes: Story = {
  render: renderStory(`
    <div :class="stackClass">
      <Container v-for="size in sizes" :key="size" :size="size" :class="containerClass">
        <p :class="[contentClass, 'font-semibold']">size="{{ size }}"</p>
      </Container>
    </div>
  `),
};

export const Gutters: Story = {
  render: renderStory(`
    <div :class="stackClass">
      <Container v-for="gutter in gutters" :key="gutter" :gutter="gutter" :class="containerClass">
        <p :class="[contentClass, 'font-semibold']">gutter="{{ gutter }}"</p>
      </Container>
    </div>
  `),
};

export const SemanticElement: Story = {
  render: renderStory(`
    <Container as-child size="md" :class="containerClass">
      <main>
        <p :class="[contentClass, 'font-semibold']">Rendered as main</p>
        <p :class="[contentClass, 'text-muted-foreground']">Use asChild when the layout wrapper also carries page semantics.</p>
      </main>
    </Container>
  `),
};

export const WithBleed: Story = {
  render: renderStory(`
    <Container :class="containerClass">
      <p :class="[contentClass, 'font-semibold']">Constrained text column</p>
      <p :class="[contentClass, 'text-muted-foreground']">Use Bleed when media or dividers should extend beyond the readable width.</p>
      <Bleed inline="md" :class="contentClass">
        <div class="border border-border bg-background p-4">Bleed content escapes the container width.</div>
      </Bleed>
    </Container>
  `),
};