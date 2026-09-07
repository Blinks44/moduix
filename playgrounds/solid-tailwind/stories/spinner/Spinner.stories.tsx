import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Spinner } from '@/components/spinner/Spinner';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  args: {
    size: 'md',
  },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

const brandSpinnerClass = 'text-primary [&_[data-slot=spinner-ring]]:border-4';

export const Basic: Story = {};

export const WithVisibleText: Story = {
  render: () => (
    <div class="inline-flex items-center gap-2">
      <Spinner decorative size="inherit" />
      <span class="text-muted-foreground">Saving changes</span>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div class="flex items-center gap-4">
      <Spinner decorative size="xs" />
      <Spinner decorative size="sm" />
      <Spinner decorative size="md" />
      <Spinner decorative size="lg" />
      <Spinner decorative size="xl" />
    </div>
  ),
};

export const InheritedSize: Story = {
  render: () => (
    <span class="text-xl">
      <Spinner decorative size="inherit" /> Loading report
    </span>
  ),
};

export const CustomIndicator: Story = {
  render: () => (
    <Spinner size="lg" aria-label="Syncing">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3v4M12 17v4M3 12h4M17 12h4M5.64 5.64l2.83 2.83M15.53 15.53l2.83 2.83M18.36 5.64l-2.83 2.83M8.47 15.53l-2.83 2.83"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </Spinner>
  ),
};

export const AsChild: Story = {
  render: () => (
    <Spinner
      asChild={(props) => (
        <svg {...props()} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" opacity="0.22" />
          <path d="M12 3a9 9 0 0 1 9 9" stroke="currentColor" stroke-width="2" />
        </svg>
      )}
      size="lg"
      aria-label="Loading report"
      class="animate-[var(--moduix-animation-spin)] text-primary motion-reduce:animate-none"
    />
  ),
};

export const Styling: Story = {
  render: () => <Spinner decorative size="lg" class={brandSpinnerClass} />,
};