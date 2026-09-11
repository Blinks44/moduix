import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Separator } from '@/components/separator/Separator';

const meta = {
  title: 'Components/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Separator>;

export default meta;

type Story = StoryObj<typeof meta>;

const cardClass = 'w-72 rounded-md border border-border bg-background p-4';
const stackClass = 'grid gap-4';
const navClass = 'inline-flex items-center gap-3 text-nowrap';
const sectionClass = 'grid gap-2';
const linkClass = 'text-sm leading-5 text-foreground no-underline';
const customSeparatorClass = 'w-32 border-primary border-t-2';

export const Default: Story = {
  render: () => (
    <div class={cardClass}>
      <div class={stackClass}>
        <span class={linkClass}>Account settings</span>
        <Separator />
        <span class={linkClass}>Billing details</span>
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <nav class={navClass} aria-label="Main navigation">
      <a href="#" class={linkClass}>
        Home
      </a>
      <a href="#" class={linkClass}>
        Pricing
      </a>
      <Separator orientation="vertical" />
      <a href="#" class={linkClass}>
        Sign in
      </a>
    </nav>
  ),
};

export const Variants: Story = {
  render: () => (
    <div class={sectionClass}>
      <span class={linkClass}>Solid</span>
      <Separator />
      <span class={linkClass}>Dashed</span>
      <Separator variant="dashed" />
      <span class={linkClass}>Dotted</span>
      <Separator variant="dotted" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div class={sectionClass}>
      <span class={linkClass}>Extra small</span>
      <Separator size="xs" />
      <span class={linkClass}>Small</span>
      <Separator size="sm" />
      <span class={linkClass}>Medium</span>
      <Separator size="md" />
      <span class={linkClass}>Large</span>
      <Separator size="lg" />
    </div>
  ),
};

export const Decorative: Story = {
  render: () => (
    <div class={sectionClass}>
      <span class={linkClass}>Related visual content</span>
      <Separator role="presentation" />
      <span class={linkClass}>Hidden from the accessibility tree</span>
    </div>
  ),
};

export const AsChild: Story = {
  render: () => (
    <div class={sectionClass}>
      <span class={linkClass}>Native host</span>
      <Separator asChild={(props) => <hr {...props()} />} />
      <span class={linkClass}>Still styled by moduix hooks</span>
    </div>
  ),
};

export const Styling: Story = {
  render: () => (
    <div class={sectionClass}>
      <span class={linkClass}>Completed profile</span>
      <Separator class={customSeparatorClass} />
      <span class={linkClass}>Next step: billing details</span>
    </div>
  ),
};