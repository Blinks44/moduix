import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Bleed } from '@/components/bleed/Bleed';

const meta = {
  title: 'Components/Bleed',
  component: Bleed,
  parameters: {
    layout: 'centered',
  },
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
  },
} satisfies Meta<typeof Bleed>;

export default meta;

type Story = StoryObj<typeof meta>;

const containerClass =
  'flex w-[min(28rem,calc(100vw_-_var(--spacing-8)))] flex-col gap-4 border border-dashed border-border';
const paddedContainerClass = `${containerClass} p-6`;
const contentClass = 'flex flex-col items-center bg-muted p-4 text-center';
const figureClass = 'flex flex-col items-center gap-3 bg-muted p-4 text-center';
const mediaClass =
  'min-h-32 w-[min(28rem,100%)] rounded-md bg-accent bg-[linear-gradient(135deg,rgb(0_0_0_/_0.14),transparent_45%)]';
const customBleedClass = '-mx-4 [inline-size:calc(100%_+_var(--spacing-8))]';

export const Basic: Story = {
  render: (args) => (
    <div class={`${containerClass} p-4`}>
      <p class="text-muted-foreground">Container content stays constrained.</p>
      <Bleed {...args} class={contentClass}>
        <p class="font-semibold">This block bleeds to the viewport edges.</p>
      </Bleed>
      <p class="text-muted-foreground">Following content returns to the container width.</p>
    </div>
  ),
};

export const BlockBleed: Story = {
  render: () => (
    <div class={paddedContainerClass}>
      <p class="text-muted-foreground">Container padding above.</p>
      <Bleed inline="md" block="md" class={contentClass}>
        <p>Inline and block bleed</p>
      </Bleed>
      <p class="text-muted-foreground">Container padding below.</p>
    </div>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div class={`${containerClass} p-4`}>
      <Bleed class={`${contentClass} ${customBleedClass}`}>
        <p class="font-semibold">Customized bleed amount.</p>
      </Bleed>
    </div>
  ),
};

export const InlineAmounts: Story = {
  render: () => (
    <div class={`${containerClass} p-4`}>
      <Bleed inline="sm" class={contentClass}>
        <p>Small inline bleed</p>
      </Bleed>
      <Bleed inline="lg" class={contentClass}>
        <p>Large inline bleed</p>
      </Bleed>
      <Bleed inline="full" class={contentClass}>
        <p>Full inline bleed</p>
      </Bleed>
    </div>
  ),
};

export const SemanticElement: Story = {
  render: () => (
    <div class={`${containerClass} p-4`}>
      <Bleed
        class={figureClass}
        asChild={(props) => (
          <figure {...props()}>
            <div class={mediaClass} />
            <p class="text-sm text-muted-foreground">Full-width media with a constrained parent.</p>
          </figure>
        )}
      />
    </div>
  ),
};