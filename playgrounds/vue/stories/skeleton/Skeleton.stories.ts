import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent } from 'vue';
import { Skeleton } from '@/components/skeleton';
import { Stack } from '@/components/stack';
import styles from './Skeleton.stories.module.css';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

const renderStory = (template: string) => () =>
  defineComponent({
    components: { Skeleton, Stack },
    setup: () => ({ styles }),
    template,
  });

export const Text: Story = {
  render: renderStory(`
      <Stack :gap="10" :class="styles.stack">
        <Skeleton :height="18" />
        <Skeleton width="86%" :height="18" />
        <Skeleton width="64%" :height="18" />
      </Stack>
    `),
};

export const Card: Story = {
  render: renderStory(`
      <Stack :gap="16" :class="styles.card">
        <Skeleton :height="148" border-radius="var(--moduix-radius-lg)" />
        <Stack :gap="12">
          <Skeleton width="70%" :height="20" />
          <Skeleton :height="14" />
          <Skeleton width="82%" :height="14" />
        </Stack>
      </Stack>
    `),
};

export const MediaObject: Story = {
  render: renderStory(`
      <Stack direction="row" align="center" :gap="12" :class="styles.mediaObject">
        <Skeleton :box-size="48" border-radius="var(--moduix-radius-full)" />
        <Stack direction="column" :gap="8" fill>
          <Skeleton width="46%" :height="16" />
          <Skeleton :height="14" />
          <Skeleton width="72%" :height="14" />
        </Stack>
      </Stack>
    `),
};

export const Composition: Story = {
  render: renderStory(`
      <Stack :gap="12" :class="styles.layoutExample">
        <Stack :direction="{ mobile: 'column', desktop: 'row' }" :gap="12">
          <Skeleton :width="72" :height="48" />
          <Stack direction="column" :gap="8" fill>
            <Skeleton width="62%" :height="14" />
            <Skeleton :height="14" />
          </Stack>
        </Stack>
        <Stack :direction="{ mobile: 'column', desktop: 'row' }" :gap="12">
          <Skeleton :width="72" :height="48" />
          <Stack direction="column" :gap="8" fill>
            <Skeleton width="48%" :height="14" />
            <Skeleton :height="14" />
          </Stack>
        </Stack>
      </Stack>
    `),
};

export const Static: Story = {
  render: renderStory(`<Skeleton :width="320" :height="72" variant="none" />`),
};

export const Variants: Story = {
  render: renderStory(`
      <Stack :gap="12" :class="styles.stack">
        <Skeleton :height="18" variant="pulse" />
        <Skeleton :height="18" variant="none" />
      </Stack>
    `),
};

export const LoadedContent: Story = {
  render: renderStory(`
      <Stack :gap="12">
        <Skeleton loading :class="styles.loadedContent">
          <strong>Loaded content</strong>
          <span>Placeholder state</span>
        </Skeleton>
        <Skeleton :loading="false" :class="styles.loadedContent">
          <strong>Loaded content</strong>
          <span>Content state</span>
        </Skeleton>
      </Stack>
    `),
};

export const AsChild: Story = {
  render: renderStory(`
      <Skeleton
        as-child
        :height="72"
        border-radius="var(--moduix-radius-lg)"
        :class="styles.asChild"
      >
        <section aria-label="Loading summary" />
      </Skeleton>
    `),
};

export const CustomStyling: Story = {
  render: renderStory(`
      <Stack :gap="10" :class="styles.customBlock">
        <Skeleton :class="styles.customSkeleton" :height="18" />
        <Skeleton :class="styles.customSkeleton" width="78%" :height="18" />
        <Skeleton :class="styles.customSkeleton" width="52%" :height="18" />
      </Stack>
    `),
};