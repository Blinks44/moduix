import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '../Text';
import { Container } from './Container';
import storyStyles from './Container.stories.module.css';

const meta = {
  title: 'Components/Container',
  component: Container,
  tags: ['autodocs'],
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
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
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

export const Alignment: Story = {
  render: () => (
    <div className={storyStyles.stack}>
      <Container size="sm" align="start" className={storyStyles.container}>
        <Text weight="semibold">Start aligned</Text>
      </Container>
      <Container size="sm" align="center" className={storyStyles.container}>
        <Text weight="semibold">Center aligned</Text>
      </Container>
      <Container size="sm" align="end" className={storyStyles.container}>
        <Text weight="semibold">End aligned</Text>
      </Container>
    </div>
  ),
};

export const SemanticElement: Story = {
  render: () => (
    <Container as="main" size="md" className={storyStyles.container}>
      <Text weight="semibold">Rendered as main</Text>
      <Text tone="muted">Use as when the layout wrapper also carries page semantics.</Text>
    </Container>
  ),
};