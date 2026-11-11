<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Stack } from '@/components/stack';
  import styles from './Stack.stories.module.css';

  const { Story } = defineMeta({
    title: 'Components/Stack',
    component: Stack,
    parameters: { layout: 'centered' },
  });
</script>

<Story name="Basic" asChild>
  <Stack class={styles.panel} gap={12}>
    <p class={styles.strong}>Project updates</p>
    <p class={styles.muted}>
      Use Stack when layout intent is just flex direction, spacing, and alignment.
    </p>
    <p class={styles.muted}>Keep more specific layout rules in local CSS.</p>
  </Stack>
</Story>

<Story name="Row" asChild>
  <Stack direction="row" align="center" justify="space-between" gap={12} class={styles.row}>
    <p class={styles.strong}>Status</p>
    <p class={styles.muted}>Ready to publish</p>
  </Stack>
</Story>

<Story name="Wrap" asChild>
  <Stack direction="row" gap={8} wrap="wrap" class={styles.wrap}>
    <div class={styles.pill}>Design</div>
    <div class={styles.pill}>Engineering</div>
    <div class={styles.pill}>Docs</div>
    <div class={styles.pill}>Release</div>
  </Stack>
</Story>

<Story name="Separator" asChild>
  <Stack direction="row" align="center" gap={10} class={styles.row}>
    <p class={styles.strong}>Design</p>
    <span role="separator" aria-hidden="true" class={styles.separator}></span>
    <p class={styles.muted}>Engineering</p>
    <span role="separator" aria-hidden="true" class={styles.separator}></span>
    <p class={styles.muted}>Docs</p>
  </Stack>
</Story>

<Story name="Fill" asChild>
  <Stack direction="row" align="center" gap={12} class={styles.row}>
    <div class={styles.skeleton} style="width: 40px; height: 40px; border-radius: 9999px"></div>
    <Stack gap={8} fill>
      <div class={styles.skeleton} style="width: 48%; height: 16px"></div>
      <div class={styles.skeleton} style="height: 14px"></div>
    </Stack>
  </Stack>
</Story>

<Story name="Responsive Direction" asChild>
  <Stack direction={{ mobile: 'column', desktop: 'row' }} gap={12} class={styles.row}>
    <p class={styles.strong}>Adaptive layout</p>
    <p class={styles.muted}>Column on mobile, row from desktop width.</p>
  </Stack>
</Story>

<Story name="Reverse Direction" asChild>
  <Stack direction="row-reverse" align="center" gap={12} class={styles.row}>
    <p class={styles.strong}>Newest update</p>
    <p class={styles.muted}>Appears first in the visual row.</p>
  </Stack>
</Story>

<Story name="Skeleton Composition" asChild>
  <Stack gap={16} class={styles.skeletonCard}>
    <div
      class={styles.skeleton}
      style="height: 144px; border-radius: var(--moduix-radius-lg)"
    ></div>
    <Stack gap={12}>
      <div class={styles.skeleton} style="width: 62%; height: 18px"></div>
      <div class={styles.skeleton} style="height: 14px"></div>
      <div class={styles.skeleton} style="width: 78%; height: 14px"></div>
    </Stack>
  </Stack>
</Story>

<Story name="Semantic Element" asChild>
  <Stack gap={12} class={styles.panel}
    >{#snippet asChild(props)}<section {...props()}>
        <p class={styles.strong}>Rendered as section</p>
        <p class={styles.muted}>
          Use asChild when the layout wrapper should also carry document semantics.
        </p>
      </section>{/snippet}</Stack
  >
</Story>