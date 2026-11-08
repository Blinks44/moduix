<script lang="ts">
  import { Input } from '@moduix/svelte/input';
  import styles from '@/components/examples/input/input-disabled-and-readonly.module.css';
</script>

<div class={styles.root}>
  <Input disabled aria-label="Disabled input" placeholder="Disabled input" />
  <Input readonly aria-label="Read-only workspace" value="Assigned workspace" />
</div>