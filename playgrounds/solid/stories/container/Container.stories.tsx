import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Bleed } from '@/components/bleed/Bleed';
import { Container } from '@/components/container/Container';
import { Text } from '@/components/text';
import storyStyles from './Container.stories.module.css';

const meta = {
  title: 'Components/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Container>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Container class={storyStyles.container}>
      <Text weight="semibold">Responsive content column</Text>
      <Text tone="muted">
        The declared size controls the readable content width. Gutters stay fluid near viewport
        edges.
      </Text>
    </Container>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div class={storyStyles.stack}>
      {(['xs', 'sm', 'md', 'lg', 'xl', 'full'] as const).map((size) => (
        <Container size={size} class={storyStyles.container}>
          <Text weight="semibold">size=&quot;{size}&quot;</Text>
        </Container>
      ))}
    </div>
  ),
};

export const Gutters: Story = {
  render: () => (
    <div class={storyStyles.stack}>
      {(['none', 'sm', 'md', 'lg'] as const).map((gutter) => (
        <Container gutter={gutter} class={storyStyles.container}>
          <Text weight="semibold">gutter=&quot;{gutter}&quot;</Text>
        </Container>
      ))}
    </div>
  ),
};

export const SemanticElement: Story = {
  render: () => (
    <Container
      asChild={(props) => (
        <main {...props()} aria-label="Container example">
          <Text weight="semibold">Rendered as main</Text>
          <Text tone="muted">Use asChild when the layout wrapper also carries page semantics.</Text>
        </main>
      )}
      size="md"
      class={storyStyles.container}
    />
  ),
};

export const WithBleed: Story = {
  render: () => (
    <Container class={storyStyles.container}>
      <Text weight="semibold">Constrained text column</Text>
      <Text tone="muted">
        Use Bleed when media or dividers should extend beyond the readable width.
      </Text>
      <Bleed inline="md">
        <div class={storyStyles.bleedSurface}>Bleed content escapes the container width.</div>
      </Bleed>
    </Container>
  ),
};