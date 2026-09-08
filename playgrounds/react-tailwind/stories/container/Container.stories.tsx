import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bleed } from '@/components/bleed/Bleed';
import { Container } from '@/components/container/Container';

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

const containerClass =
  'border-y border-dashed border-border bg-muted [background-image:linear-gradient(90deg,rgb(0_0_0_/_0.05)_0_1px,transparent_1px)] [background-position:0_0] [background-size:4rem_100%] py-4';
const stackClass = 'flex w-full flex-col gap-4 py-4';
const contentClass = 'max-w-[42rem]';

export const Basic: Story = {
  render: () => (
    <Container className={containerClass}>
      <p className={`${contentClass} font-semibold`}>Responsive content column</p>
      <p className={`${contentClass} text-muted-foreground`}>
        The declared size controls the readable content width. Gutters stay fluid near viewport
        edges.
      </p>
    </Container>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className={stackClass}>
      {(['xs', 'sm', 'md', 'lg', 'xl', 'full'] as const).map((size) => (
        <Container key={size} size={size} className={containerClass}>
          <p className={`${contentClass} font-semibold`}>size=&quot;{size}&quot;</p>
        </Container>
      ))}
    </div>
  ),
};

export const Gutters: Story = {
  render: () => (
    <div className={stackClass}>
      {(['none', 'sm', 'md', 'lg'] as const).map((gutter) => (
        <Container key={gutter} gutter={gutter} className={containerClass}>
          <p className={`${contentClass} font-semibold`}>gutter=&quot;{gutter}&quot;</p>
        </Container>
      ))}
    </div>
  ),
};

export const SemanticElement: Story = {
  render: () => (
    <Container asChild size="md" className={containerClass}>
      <main>
        <p className={`${contentClass} font-semibold`}>Rendered as main</p>
        <p className={`${contentClass} text-muted-foreground`}>
          Use asChild when the layout wrapper also carries page semantics.
        </p>
      </main>
    </Container>
  ),
};

export const WithBleed: Story = {
  render: () => (
    <Container className={containerClass}>
      <p className={`${contentClass} font-semibold`}>Constrained text column</p>
      <p className={`${contentClass} text-muted-foreground`}>
        Use Bleed when media or dividers should extend beyond the readable width.
      </p>
      <Bleed inline="md" className={contentClass}>
        <div className="border border-border bg-background p-4">
          Bleed content escapes the container width.
        </div>
      </Bleed>
    </Container>
  ),
};