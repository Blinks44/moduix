<script lang="ts">
  import { Spinner } from '@moduix/svelte/spinner';
  import styles from '@/components/examples/spinner/spinner-inline-loading-text.module.css';
</script>

<div class={styles.root}>
  <Spinner decorative size="inherit" />
  <span class={styles.label}>Saving changes</span>
</div>