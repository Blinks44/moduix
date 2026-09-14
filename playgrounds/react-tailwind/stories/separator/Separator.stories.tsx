import type { Meta, StoryObj } from '@storybook/react-vite';
import { Separator } from '@/components/separator/Separator';

const meta = {
  title: 'Components/Separator',
  component: Separator,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Separator>;

export default meta;

type Story = StoryObj<typeof meta>;

const cardClassName = 'w-72 rounded-md border border-border bg-background p-4';
const stackClassName = 'grid gap-4';
const navClassName = 'inline-flex items-center gap-3 text-nowrap';
const sectionClassName = 'grid gap-2';
const linkClassName = 'text-sm leading-5 text-foreground no-underline';
const customSeparatorClassName = 'w-32 border-primary border-t-2';

export const Default: Story = {
  render: () => (
    <div className={cardClassName}>
      <div className={stackClassName}>
        <span className={linkClassName}>Account settings</span>
        <Separator />
        <span className={linkClassName}>Billing details</span>
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <nav className={navClassName} aria-label="Main navigation">
      <a href="#" className={linkClassName}>
        Home
      </a>
      <a href="#" className={linkClassName}>
        Pricing
      </a>
      <Separator orientation="vertical" />
      <a href="#" className={linkClassName}>
        Sign in
      </a>
    </nav>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className={sectionClassName}>
      <span className={linkClassName}>Solid</span>
      <Separator />
      <span className={linkClassName}>Dashed</span>
      <Separator variant="dashed" />
      <span className={linkClassName}>Dotted</span>
      <Separator variant="dotted" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className={sectionClassName}>
      <span className={linkClassName}>Extra small</span>
      <Separator size="xs" />
      <span className={linkClassName}>Small</span>
      <Separator size="sm" />
      <span className={linkClassName}>Medium</span>
      <Separator size="md" />
      <span className={linkClassName}>Large</span>
      <Separator size="lg" />
    </div>
  ),
};

export const Decorative: Story = {
  render: () => (
    <div className={sectionClassName}>
      <span className={linkClassName}>Related visual content</span>
      <Separator role="presentation" />
      <span className={linkClassName}>Hidden from the accessibility tree</span>
    </div>
  ),
};

export const AsChild: Story = {
  render: () => (
    <div className={sectionClassName}>
      <span className={linkClassName}>Native host</span>
      <Separator asChild>
        <hr />
      </Separator>
      <span className={linkClassName}>Still styled by moduix hooks</span>
    </div>
  ),
};

export const Styling: Story = {
  render: () => (
    <div className={sectionClassName}>
      <span className={linkClassName}>Completed profile</span>
      <Separator className={customSeparatorClassName} />
      <span className={linkClassName}>Next step: billing details</span>
    </div>
  ),
};