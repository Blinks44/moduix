<script lang="ts">
  import { Separator } from '@moduix/svelte/separator';
  import { Stack } from '@moduix/svelte/stack';
  import styles from '@/components/examples/separator/separator-decorative.module.css';

  const sections = ['Personal details', 'Notifications'];
</script>

<div class={styles.root}>
  <Stack gap="4">
    <span>{sections[0]}</span>
    <Separator role="presentation" />
    <span>{sections[1]}</span>
  </Stack>
</div>