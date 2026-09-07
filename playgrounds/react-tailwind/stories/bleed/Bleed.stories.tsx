import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bleed } from '@/components/bleed/Bleed';

const meta = {
  title: 'Components/Bleed',
  component: Bleed,
  tags: ['autodocs'],
  args: {
    inline: 'full',
    block: 'none',
  },
  argTypes: {
    inline: {
      control: 'inline-radio',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'],
    },
    block: {
      control: 'inline-radio',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    asChild: {
      control: 'boolean',
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Bleed>;

export default meta;

type Story = StoryObj<typeof meta>;

const containerClassName =
  'flex w-[min(28rem,calc(100vw_-_var(--spacing-8)))] flex-col gap-4 border border-dashed border-border';
const paddedContainerClassName = `${containerClassName} p-6`;
const contentClassName = 'flex flex-col items-center bg-muted p-4 text-center';
const figureClassName = 'flex flex-col items-center gap-3 bg-muted p-4 text-center';
const mediaClassName =
  'min-h-32 w-[min(28rem,100%)] rounded-md bg-accent bg-[linear-gradient(135deg,rgb(0_0_0_/_0.14),transparent_45%)]';
const customBleedClassName = '-mx-4 [inline-size:calc(100%_+_var(--spacing-8))]';

export const Basic: Story = {
  render: (args) => (
    <div className={`${containerClassName} p-4`}>
      <p className="text-muted-foreground">Container content stays constrained.</p>
      <Bleed {...args} className={contentClassName}>
        <p className="font-semibold">This block bleeds to the viewport edges.</p>
      </Bleed>
      <p className="text-muted-foreground">Following content returns to the container width.</p>
    </div>
  ),
};

export const BlockBleed: Story = {
  render: () => (
    <div className={paddedContainerClassName}>
      <p className="text-muted-foreground">Container padding above.</p>
      <Bleed inline="md" block="md" className={contentClassName}>
        <p>Inline and block bleed</p>
      </Bleed>
      <p className="text-muted-foreground">Container padding below.</p>
    </div>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div className={`${containerClassName} p-4`}>
      <Bleed className={`${contentClassName} ${customBleedClassName}`}>
        <p className="font-semibold">Customized bleed amount.</p>
      </Bleed>
    </div>
  ),
};

export const InlineAmounts: Story = {
  render: () => (
    <div className={`${containerClassName} p-4`}>
      <Bleed inline="sm" className={contentClassName}>
        <p>Small inline bleed</p>
      </Bleed>
      <Bleed inline="lg" className={contentClassName}>
        <p>Large inline bleed</p>
      </Bleed>
      <Bleed inline="full" className={contentClassName}>
        <p>Full inline bleed</p>
      </Bleed>
    </div>
  ),
};

export const SemanticElement: Story = {
  render: () => (
    <div className={`${containerClassName} p-4`}>
      <Bleed asChild className={figureClassName}>
        <figure>
          <div className={mediaClassName} />
          <p className="text-sm text-muted-foreground">
            Full-width media with a constrained parent.
          </p>
        </figure>
      </Bleed>
    </div>
  ),
};