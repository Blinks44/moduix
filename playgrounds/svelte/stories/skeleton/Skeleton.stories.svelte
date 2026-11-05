<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Skeleton } from '@/components/skeleton';
  import { Stack } from '@/components/stack';
  import styles from './Skeleton.stories.module.css';

  const { Story } = defineMeta({
    title: 'Components/Skeleton',
    component: Skeleton,
    parameters: { layout: 'centered' },
  });
</script>

<Story name="Text" asChild>
  <Stack gap={10} class={styles.stack}>
    <Skeleton height={18} />
    <Skeleton width="86%" height={18} />
    <Skeleton width="64%" height={18} />
  </Stack>
</Story>

<Story name="Card" asChild>
  <Stack gap={16} class={styles.card}>
    <Skeleton height={148} borderRadius="var(--moduix-radius-lg)" />
    <Stack gap={12}>
      <Skeleton width="70%" height={20} />
      <Skeleton height={14} />
      <Skeleton width="82%" height={14} />
    </Stack>
  </Stack>
</Story>

<Story name="Media Object" asChild>
  <Stack direction="row" align="center" gap={12} class={styles.mediaObject}>
    <Skeleton boxSize={48} borderRadius="var(--moduix-radius-full)" />
    <Stack direction="column" gap={8} fill>
      <Skeleton width="46%" height={16} />
      <Skeleton height={14} />
      <Skeleton width="72%" height={14} />
    </Stack>
  </Stack>
</Story>

<Story name="Composition" asChild>
  <Stack gap={12} class={styles.layoutExample}>
    <Stack direction={{ mobile: 'column', desktop: 'row' }} gap={12}>
      <Skeleton width={72} height={48} />
      <Stack direction="column" gap={8} fill>
        <Skeleton width="62%" height={14} />
        <Skeleton height={14} />
      </Stack>
    </Stack>
    <Stack direction={{ mobile: 'column', desktop: 'row' }} gap={12}>
      <Skeleton width={72} height={48} />
      <Stack direction="column" gap={8} fill>
        <Skeleton width="48%" height={14} />
        <Skeleton height={14} />
      </Stack>
    </Stack>
  </Stack>
</Story>

<Story name="Static" asChild>
  <Skeleton width={320} height={72} variant="none" />
</Story>

<Story name="Variants" asChild>
  <Stack gap={12} class={styles.stack}>
    <Skeleton height={18} variant="pulse" />
    <Skeleton height={18} variant="none" />
  </Stack>
</Story>

<Story name="Loaded Content" asChild>
  <Stack gap={12}>
    <Skeleton loading class={styles.loadedContent}>
      <strong>Loaded content</strong>
      <span>Placeholder state</span>
    </Skeleton>
    <Skeleton loading={false} class={styles.loadedContent}>
      <strong>Loaded content</strong>
      <span>Content state</span>
    </Skeleton>
  </Stack>
</Story>

<Story name="As Child" asChild>
  <Skeleton height={72} borderRadius="var(--moduix-radius-lg)" class={styles.asChild}
    >{#snippet asChild(props)}<section
        {...props()}
        aria-label="Loading summary"
      ></section>{/snippet}</Skeleton
  >
</Story>

<Story name="Custom Styling" asChild>
  <Stack gap={10} class={styles.customBlock}>
    <Skeleton class={styles.customSkeleton} height={18} />
    <Skeleton class={styles.customSkeleton} width="78%" height={18} />
    <Skeleton class={styles.customSkeleton} width="52%" height={18} />
  </Stack>
</Story>