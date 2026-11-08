<script lang="ts">
  import { ChevronRight as ChevronRightIcon } from '@lucide/svelte';
  import { Badge, BadgeLabel } from '@moduix/svelte/badge';
  import styles from '@/components/examples/badge/badge-with-icon.module.css';

  const labels = {
    release: 'Release',
    details: 'Details',
    more: 'Read more',
  };
</script>

<div class={styles.root}>
  <Badge variant="default">
    <BadgeLabel>{labels.release}</BadgeLabel>
    <ChevronRightIcon />
  </Badge>
  <Badge variant="secondary">
    <BadgeLabel>{labels.details}</BadgeLabel>
    <ChevronRightIcon />
  </Badge>
  <Badge variant="link">
    {#snippet asChild(props)}
      <a {...props()} href="#styling">
        <BadgeLabel>{labels.more}</BadgeLabel>
        <ChevronRightIcon />
      </a>
    {/snippet}
  </Badge>
</div>