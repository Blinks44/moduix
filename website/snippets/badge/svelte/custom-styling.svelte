<script lang="ts">
  import { Badge, BadgeDot, BadgeLabel } from '@moduix/svelte/badge';
  import styles from '@/components/examples/badge/badge-custom-styling.module.css';
</script>

<div class={styles.root}>
  <Badge class={styles.square}>Square</Badge>
  <Badge class={styles.priority}>
    <BadgeDot />
    <BadgeLabel>Priority</BadgeLabel>
  </Badge>
</div>