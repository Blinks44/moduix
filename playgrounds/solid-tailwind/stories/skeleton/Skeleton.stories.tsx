import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Skeleton } from '@/components/skeleton';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Text: Story = {
  render: () => (
    <div class="grid w-80 gap-2.5">
      <Skeleton height={18} />
      <Skeleton width="86%" height={18} />
      <Skeleton width="64%" height={18} />
    </div>
  ),
};

export const Card: Story = {
  render: () => (
    <div class="grid w-80 gap-4">
      <Skeleton height={148} class="rounded-lg" />
      <div class="grid gap-3">
        <Skeleton width="70%" height={20} />
        <Skeleton height={14} />
        <Skeleton width="82%" height={14} />
      </div>
    </div>
  ),
};

export const MediaObject: Story = {
  render: () => (
    <div class="flex w-96 items-center gap-3">
      <Skeleton boxSize={48} class="rounded-full" />
      <div class="grid min-w-0 flex-1 gap-2">
        <Skeleton width="46%" height={16} />
        <Skeleton height={14} />
        <Skeleton width="72%" height={14} />
      </div>
    </div>
  ),
};

export const Composition: Story = {
  render: () => (
    <div class="grid w-96 gap-3 py-1">
      <div class="flex flex-col gap-3 md:flex-row">
        <Skeleton width={72} height={48} />
        <div class="grid min-w-0 flex-1 gap-2">
          <Skeleton width="62%" height={14} />
          <Skeleton height={14} />
        </div>
      </div>
      <div class="flex flex-col gap-3 md:flex-row">
        <Skeleton width={72} height={48} />
        <div class="grid min-w-0 flex-1 gap-2">
          <Skeleton width="48%" height={14} />
          <Skeleton height={14} />
        </div>
      </div>
    </div>
  ),
};

export const Static: Story = {
  render: () => <Skeleton width={320} height={72} variant="none" />,
};

export const Variants: Story = {
  render: () => (
    <div class="grid w-80 gap-3">
      <Skeleton height={18} variant="pulse" />
      <Skeleton height={18} variant="none" />
    </div>
  ),
};

export const LoadedContent: Story = {
  render: () => (
    <div class="grid gap-3">
      <Skeleton loading class="grid min-h-[4.5rem] w-80 gap-1 border border-border p-4">
        <strong>Loaded content</strong>
        <span class="text-sm text-muted-foreground">Placeholder state</span>
      </Skeleton>
      <Skeleton loading={false} class="grid min-h-[4.5rem] w-80 gap-1 border border-border p-4">
        <strong>Loaded content</strong>
        <span class="text-sm text-muted-foreground">Content state</span>
      </Skeleton>
    </div>
  ),
};

export const AsChild: Story = {
  render: () => (
    <Skeleton
      asChild={(props) => <section {...props()} aria-label="Loading summary" />}
      height={72}
      class="w-80 rounded-lg"
    />
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div class="grid w-80 gap-2.5">
      <Skeleton class="animate-none rounded-full bg-primary opacity-30" height={18} />
      <Skeleton class="animate-none rounded-full bg-primary opacity-30" width="78%" height={18} />
      <Skeleton class="animate-none rounded-full bg-primary opacity-30" width="52%" height={18} />
    </div>
  ),
};