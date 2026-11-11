<script lang="ts">
  import { Badge, BadgeDot, BadgeLabel } from '@moduix/svelte/badge';
  import styles from '@/components/examples/badge/badge-with-dot.module.css';

  const statuses = [
    { label: 'Online', variant: 'default' },
    { label: 'Draft', variant: 'secondary' },
    { label: 'Failed', variant: 'destructive' },
  ] as const;
</script>

<div class={styles.root}>
  {#each statuses as status (status.label)}
    <Badge variant={status.variant}>
      <BadgeDot />
      <BadgeLabel>{status.label}</BadgeLabel>
    </Badge>
  {/each}
</div>