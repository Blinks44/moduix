import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Separator as SeparatorComponent } from '@/components/separator';
import { Skeleton } from '@/components/skeleton';
import { Stack } from '@/components/stack/Stack';

const panelClass = 'w-80 rounded-lg border border-border bg-background p-4';
const rowClass = panelClass;
const wrapClass = 'w-80';
const pillClass =
  'rounded-full border border-border bg-muted px-3 py-2 text-sm leading-5 text-foreground';
const skeletonCardClass = 'w-80';
const mutedClass = 'text-muted-foreground';

const meta = {
  title: 'Components/Stack',
  component: Stack,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Stack>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Stack gap={12} class={panelClass}>
      <p class="font-semibold">Project updates</p>
      <p class={mutedClass}>
        Use Stack when layout intent is just flex direction, spacing, and alignment.
      </p>
      <p class={mutedClass}>Keep more specific layout rules in local CSS.</p>
    </Stack>
  ),
};

export const Row: Story = {
  render: () => (
    <Stack direction="row" align="center" justify="space-between" gap={12} class={rowClass}>
      <p class="font-semibold">Status</p>
      <p class={mutedClass}>Ready to publish</p>
    </Stack>
  ),
};

export const Wrap: Story = {
  render: () => (
    <Stack direction="row" gap={8} wrap="wrap" class={wrapClass}>
      <div class={pillClass}>Design</div>
      <div class={pillClass}>Engineering</div>
      <div class={pillClass}>Docs</div>
      <div class={pillClass}>Release</div>
    </Stack>
  ),
};

export const Separator: Story = {
  render: () => (
    <Stack direction="row" align="center" gap={10} class={rowClass}>
      <p class="font-semibold">Design</p>
      <SeparatorComponent orientation="vertical" aria-hidden="true" />
      <p class={mutedClass}>Engineering</p>
      <SeparatorComponent orientation="vertical" aria-hidden="true" />
      <p class={mutedClass}>Docs</p>
    </Stack>
  ),
};

export const Fill: Story = {
  render: () => (
    <Stack direction="row" align="center" gap={12} class={rowClass}>
      <Skeleton width={40} height={40} class="rounded-full" />
      <Stack gap={8} fill>
        <Skeleton width="48%" height={16} />
        <Skeleton height={14} />
      </Stack>
    </Stack>
  ),
};

export const ResponsiveDirection: Story = {
  render: () => (
    <Stack direction={{ mobile: 'column', desktop: 'row' }} gap={12} class={rowClass}>
      <p class="font-semibold">Adaptive layout</p>
      <p class={mutedClass}>Column on mobile, row from desktop width.</p>
    </Stack>
  ),
};

export const ReverseDirection: Story = {
  render: () => (
    <Stack direction="row-reverse" align="center" gap={12} class={rowClass}>
      <p class="font-semibold">Newest update</p>
      <p class={mutedClass}>Appears first in the visual row.</p>
    </Stack>
  ),
};

export const SkeletonComposition: Story = {
  render: () => (
    <Stack gap={16} class={skeletonCardClass}>
      <Skeleton height={144} class="rounded-lg" />
      <Stack gap={12}>
        <Skeleton width="62%" height={18} />
        <Skeleton height={14} />
        <Skeleton width="78%" height={14} />
      </Stack>
    </Stack>
  ),
};

export const SemanticElement: Story = {
  render: () => (
    <Stack
      asChild={(props) => (
        <section {...props()} aria-label="Rendered as section">
          <p class="font-semibold">Rendered as section</p>
          <p class={mutedClass}>
            Use asChild when the layout wrapper should also carry document semantics.
          </p>
        </section>
      )}
      gap={12}
      class={panelClass}
    />
  ),
};