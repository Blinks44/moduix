import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bleed } from '../bleed';
import { Text } from '../text';
import { Container } from './Container';
import storyStyles from './Container.stories.module.css';

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

export const Basic: Story = {
  render: () => (
    <Container className={storyStyles.container}>
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
    <div className={storyStyles.stack}>
      {(['xs', 'sm', 'md', 'lg', 'xl', 'full'] as const).map((size) => (
        <Container key={size} size={size} className={storyStyles.container}>
          <Text weight="semibold">size=&quot;{size}&quot;</Text>
        </Container>
      ))}
    </div>
  ),
};

export const Gutters: Story = {
  render: () => (
    <div className={storyStyles.stack}>
      {(['none', 'sm', 'md', 'lg'] as const).map((gutter) => (
        <Container key={gutter} gutter={gutter} className={storyStyles.container}>
          <Text weight="semibold">gutter=&quot;{gutter}&quot;</Text>
        </Container>
      ))}
    </div>
  ),
};

export const SemanticElement: Story = {
  render: () => (
    <Container asChild size="md" className={storyStyles.container}>
      <main>
        <Text weight="semibold">Rendered as main</Text>
        <Text tone="muted">Use asChild when the layout wrapper also carries page semantics.</Text>
      </main>
    </Container>
  ),
};

export const WithBleed: Story = {
  render: () => (
    <Container className={storyStyles.container}>
      <Text weight="semibold">Constrained text column</Text>
      <Text tone="muted">
        Use Bleed when media or dividers should extend beyond the readable width.
      </Text>
      <Bleed inline="md">
        <div className={storyStyles.bleedSurface}>Bleed content escapes the container width.</div>
      </Bleed>
    </Container>
  ),
};