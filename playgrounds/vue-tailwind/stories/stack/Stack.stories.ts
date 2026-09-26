import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent } from 'vue';
import { Stack } from '@/components/stack';

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

const storyComponents = { Stack };

function renderStory(template: string) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return {
          mutedClass,
          panelClass,
          pillClass,
          rowClass,
          skeletonCardClass,
          wrapClass,
        };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory(`
    <Stack :gap="12" :class="panelClass">
      <p class="font-semibold">Project updates</p>
      <p :class="mutedClass">Use Stack when layout intent is just flex direction, spacing, and alignment.</p>
      <p :class="mutedClass">Keep more specific layout rules in local CSS.</p>
    </Stack>
  `),
};

export const Row: Story = {
  render: renderStory(`
    <Stack direction="row" align="center" justify="space-between" :gap="12" :class="rowClass">
      <p class="font-semibold">Status</p>
      <p :class="mutedClass">Ready to publish</p>
    </Stack>
  `),
};

export const Wrap: Story = {
  render: renderStory(`
    <Stack direction="row" :gap="8" wrap="wrap" :class="wrapClass">
      <div :class="pillClass">Design</div>
      <div :class="pillClass">Engineering</div>
      <div :class="pillClass">Docs</div>
      <div :class="pillClass">Release</div>
    </Stack>
  `),
};

export const Separator: Story = {
  render: renderStory(`
    <Stack direction="row" align="center" :gap="10" :class="rowClass">
      <p class="font-semibold">Design</p>
      <span role="separator" aria-hidden="true" class="w-px self-stretch bg-border" />
      <p :class="mutedClass">Engineering</p>
      <span role="separator" aria-hidden="true" class="w-px self-stretch bg-border" />
      <p :class="mutedClass">Docs</p>
    </Stack>
  `),
};

export const Fill: Story = {
  render: renderStory(`
    <Stack direction="row" align="center" :gap="12" :class="rowClass">
      <div class="h-10 w-10 rounded-full bg-muted" />
      <Stack :gap="8" fill>
        <div class="h-4 w-[48%] rounded-sm bg-muted" />
        <div class="h-3.5 rounded-sm bg-muted" />
      </Stack>
    </Stack>
  `),
};

export const ResponsiveDirection: Story = {
  render: renderStory(`
    <Stack :direction="{ mobile: 'column', desktop: 'row' }" :gap="12" :class="rowClass">
      <p class="font-semibold">Adaptive layout</p>
      <p :class="mutedClass">Column on mobile, row from desktop width.</p>
    </Stack>
  `),
};

export const ReverseDirection: Story = {
  render: renderStory(`
    <Stack direction="row-reverse" align="center" :gap="12" :class="rowClass">
      <p class="font-semibold">Newest update</p>
      <p :class="mutedClass">Appears first in the visual row.</p>
    </Stack>
  `),
};

export const SkeletonComposition: Story = {
  render: renderStory(`
    <Stack :gap="16" :class="skeletonCardClass">
      <div class="h-36 rounded-lg bg-muted" />
      <Stack :gap="12">
        <div class="h-4.5 w-[62%] rounded-sm bg-muted" />
        <div class="h-3.5 rounded-sm bg-muted" />
        <div class="h-3.5 w-[78%] rounded-sm bg-muted" />
      </Stack>
    </Stack>
  `),
};

export const SemanticElement: Story = {
  render: renderStory(`
    <Stack as-child :gap="12" :class="panelClass">
      <section>
        <p class="font-semibold">Rendered as section</p>
        <p :class="mutedClass">Use asChild when the layout wrapper should also carry document semantics.</p>
      </section>
    </Stack>
  `),
};