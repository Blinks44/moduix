import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Badge } from '@/components/badge/Badge';
import { ChevronRightIcon } from '@/lib/moduix/icons/ui';

const meta = {
  title: 'Components/Badge',
  component: Badge.Root,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Badge.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

const rowClass = 'flex flex-wrap items-center gap-2';
const constrainedClass = 'max-w-56';
const customBadgeClass =
  'min-h-6 rounded-sm border-primary/35 bg-[color-mix(in_oklab,var(--color-primary)_20%,var(--color-background))] px-3 text-primary';
const smallBadgeClass = 'min-h-4 px-2';
const largeBadgeClass = 'min-h-8 px-4 text-sm [&>svg]:size-4';

const variants = ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'] as const;

export const Basic: Story = {
  args: {
    children: 'New',
  },
};

export const Variants: Story = {
  render: () => (
    <div class={rowClass}>
      {variants.map((variant) => (
        <Badge.Root variant={variant}>{variant}</Badge.Root>
      ))}
    </div>
  ),
};

export const WithDot: Story = {
  render: () => (
    <div class={rowClass}>
      <Badge.Root variant="default">
        <Badge.Dot />
        <Badge.Label>Online</Badge.Label>
      </Badge.Root>
      <Badge.Root variant="secondary">
        <Badge.Dot />
        <Badge.Label>Draft</Badge.Label>
      </Badge.Root>
      <Badge.Root variant="destructive">
        <Badge.Dot />
        <Badge.Label>Failed</Badge.Label>
      </Badge.Root>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div class={rowClass}>
      <Badge.Root variant="default">
        <Badge.Label>Release</Badge.Label>
        <ChevronRightIcon />
      </Badge.Root>
      <Badge.Root variant="secondary">
        <Badge.Label>Details</Badge.Label>
        <ChevronRightIcon />
      </Badge.Root>
      <Badge.Root variant="outline">
        <Badge.Label>Read more</Badge.Label>
        <ChevronRightIcon />
      </Badge.Root>
      <Badge.Root
        variant="link"
        asChild={(props) => (
          <a {...props()} href="#badge-link-story">
            <Badge.Label>Styling guide</Badge.Label>
            <ChevronRightIcon />
          </a>
        )}
      />
    </div>
  ),
};

export const Link: Story = {
  render: () => (
    <Badge.Root
      variant="link"
      asChild={(props) => (
        <a {...props()} href="#badge-link-story">
          Open badge composition guidance
        </a>
      )}
    />
  ),
};

export const DisabledButton: Story = {
  render: () => (
    <Badge.Root
      variant="secondary"
      asChild={(props) => (
        <button {...props()} disabled>
          Archived
        </button>
      )}
    />
  ),
};

export const TruncatedLabel: Story = {
  render: () => (
    <Badge.Root class={constrainedClass} title="Ready for stakeholder review after legal approval">
      <Badge.Label>Ready for stakeholder review after legal approval</Badge.Label>
    </Badge.Root>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div class={rowClass}>
      <Badge.Root class={smallBadgeClass}>Small</Badge.Root>
      <Badge.Root>Default</Badge.Root>
      <Badge.Root class={largeBadgeClass}>Large</Badge.Root>
      <Badge.Root class={customBadgeClass}>
        <Badge.Dot class="size-2" />
        <Badge.Label>Priority</Badge.Label>
      </Badge.Root>
    </div>
  ),
};