import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent } from 'vue';
import { Stack } from '@/components/stack';
import styles from './Stack.stories.module.css';

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
        return { styles };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory(`
    <Stack :class="styles.panel" :gap="12">
      <p :class="styles.strong">Project updates</p>
      <p :class="styles.muted">Use Stack when layout intent is just flex direction, spacing, and alignment.</p>
      <p :class="styles.muted">Keep more specific layout rules in local CSS.</p>
    </Stack>
  `),
};

export const Row: Story = {
  render: renderStory(`
    <Stack direction="row" align="center" justify="space-between" :gap="12" :class="styles.row">
      <p :class="styles.strong">Status</p>
      <p :class="styles.muted">Ready to publish</p>
    </Stack>
  `),
};

export const Wrap: Story = {
  render: renderStory(`
    <Stack direction="row" :gap="8" wrap="wrap" :class="styles.wrap">
      <div :class="styles.pill">Design</div>
      <div :class="styles.pill">Engineering</div>
      <div :class="styles.pill">Docs</div>
      <div :class="styles.pill">Release</div>
    </Stack>
  `),
};

export const Separator: Story = {
  render: renderStory(`
    <Stack direction="row" align="center" :gap="10" :class="styles.row">
      <p :class="styles.strong">Design</p>
      <span role="separator" aria-hidden="true" :class="styles.separator" />
      <p :class="styles.muted">Engineering</p>
      <span role="separator" aria-hidden="true" :class="styles.separator" />
      <p :class="styles.muted">Docs</p>
    </Stack>
  `),
};

export const Fill: Story = {
  render: renderStory(`
    <Stack direction="row" align="center" :gap="12" :class="styles.row">
      <div :class="styles.skeleton" style="width: 40px; height: 40px; border-radius: 9999px" />
      <Stack :gap="8" fill>
        <div :class="styles.skeleton" style="width: 48%; height: 16px" />
        <div :class="styles.skeleton" style="height: 14px" />
      </Stack>
    </Stack>
  `),
};

export const ResponsiveDirection: Story = {
  render: renderStory(`
    <Stack :direction="{ mobile: 'column', desktop: 'row' }" :gap="12" :class="styles.row">
      <p :class="styles.strong">Adaptive layout</p>
      <p :class="styles.muted">Column on mobile, row from desktop width.</p>
    </Stack>
  `),
};

export const ReverseDirection: Story = {
  render: renderStory(`
    <Stack direction="row-reverse" align="center" :gap="12" :class="styles.row">
      <p :class="styles.strong">Newest update</p>
      <p :class="styles.muted">Appears first in the visual row.</p>
    </Stack>
  `),
};

export const SkeletonComposition: Story = {
  render: renderStory(`
    <Stack :gap="16" :class="styles.skeletonCard">
      <div :class="styles.skeleton" style="height: 144px; border-radius: var(--moduix-radius-lg)" />
      <Stack :gap="12">
        <div :class="styles.skeleton" style="width: 62%; height: 18px" />
        <div :class="styles.skeleton" style="height: 14px" />
        <div :class="styles.skeleton" style="width: 78%; height: 14px" />
      </Stack>
    </Stack>
  `),
};

export const SemanticElement: Story = {
  render: renderStory(`
    <Stack as-child :gap="12" :class="styles.panel">
      <section>
        <p :class="styles.strong">Rendered as section</p>
        <p :class="styles.muted">Use asChild when the layout wrapper should also carry document semantics.</p>
      </section>
    </Stack>
  `),
};