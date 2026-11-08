<script lang="ts">
  import { Badge, BadgeLabel } from '@moduix/svelte/badge';
  import styles from '@/components/examples/badge/badge-long-labels.module.css';

  const label = 'Ready for stakeholder review after legal approval for production release';
</script>

<Badge class={styles.root} title={label}>
  <BadgeLabel class={styles.label}>{label}</BadgeLabel>
</Badge>