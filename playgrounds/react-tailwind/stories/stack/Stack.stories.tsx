import type { Meta, StoryObj } from '@storybook/react-vite';
import { Separator as SeparatorComponent } from '@/components/separator';
import { Skeleton } from '@/components/skeleton';
import { Stack } from '@/components/stack/Stack';

const panelClassName = 'w-80 rounded-lg border border-border bg-background p-4';
const rowClassName = panelClassName;
const wrapClassName = 'w-80';
const pillClassName =
  'rounded-full border border-border bg-muted px-3 py-2 text-sm leading-5 text-foreground';
const skeletonCardClassName = 'w-80';
const mutedClassName = 'text-muted-foreground';

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
    <Stack gap={12} className={panelClassName}>
      <p className="font-semibold">Project updates</p>
      <p className={mutedClassName}>
        Use Stack when layout intent is just flex direction, spacing, and alignment.
      </p>
      <p className={mutedClassName}>Keep more specific layout rules in local CSS.</p>
    </Stack>
  ),
};

export const Row: Story = {
  render: () => (
    <Stack direction="row" align="center" justify="space-between" gap={12} className={rowClassName}>
      <p className="font-semibold">Status</p>
      <p className={mutedClassName}>Ready to publish</p>
    </Stack>
  ),
};

export const Wrap: Story = {
  render: () => (
    <Stack direction="row" gap={8} wrap="wrap" className={wrapClassName}>
      <div className={pillClassName}>Design</div>
      <div className={pillClassName}>Engineering</div>
      <div className={pillClassName}>Docs</div>
      <div className={pillClassName}>Release</div>
    </Stack>
  ),
};

export const Separator: Story = {
  render: () => (
    <Stack direction="row" align="center" gap={10} className={rowClassName}>
      <p className="font-semibold">Design</p>
      <SeparatorComponent orientation="vertical" aria-hidden="true" />
      <p className={mutedClassName}>Engineering</p>
      <SeparatorComponent orientation="vertical" aria-hidden="true" />
      <p className={mutedClassName}>Docs</p>
    </Stack>
  ),
};

export const Fill: Story = {
  render: () => (
    <Stack direction="row" align="center" gap={12} className={rowClassName}>
      <Skeleton width={40} height={40} className="rounded-full" />
      <Stack gap={8} fill>
        <Skeleton width="48%" height={16} />
        <Skeleton height={14} />
      </Stack>
    </Stack>
  ),
};

export const ResponsiveDirection: Story = {
  render: () => (
    <Stack direction={{ mobile: 'column', desktop: 'row' }} gap={12} className={rowClassName}>
      <p className="font-semibold">Adaptive layout</p>
      <p className={mutedClassName}>Column on mobile, row from desktop width.</p>
    </Stack>
  ),
};

export const ReverseDirection: Story = {
  render: () => (
    <Stack direction="row-reverse" align="center" gap={12} className={rowClassName}>
      <p className="font-semibold">Newest update</p>
      <p className={mutedClassName}>Appears first in the visual row.</p>
    </Stack>
  ),
};

export const SkeletonComposition: Story = {
  render: () => (
    <Stack gap={16} className={skeletonCardClassName}>
      <Skeleton height={144} className="rounded-lg" />
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
    <Stack asChild gap={12} className={panelClassName}>
      <section>
        <p className="font-semibold">Rendered as section</p>
        <p className={mutedClassName}>
          Use asChild when the layout wrapper should also carry document semantics.
        </p>
      </section>
    </Stack>
  ),
};