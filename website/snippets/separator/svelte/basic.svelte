<script lang="ts">
  import { Separator } from '@moduix/svelte/separator';
  import { Stack } from '@moduix/svelte/stack';
  import styles from '@/components/examples/separator/separator-basic.module.css';

  const sections = ['Account settings', 'Billing details'];
</script>

<div class={styles.root}>
  <Stack gap="4">
    <span>{sections[0]}</span>
    <Separator />
    <span>{sections[1]}</span>
  </Stack>
</div>