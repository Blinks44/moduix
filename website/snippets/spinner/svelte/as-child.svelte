<script lang="ts">
  import { Spinner } from '@moduix/svelte/spinner';
  import styles from '@/components/examples/spinner/spinner-as-child.module.css';
</script>

<Spinner size="lg" aria-label="Loading report">
  {#snippet asChild(props)}
    <span {...props()} class={styles.root}>
      <span
        aria-hidden="true"
        data-scope="spinner"
        data-part="indicator"
        data-slot="spinner-indicator"
      >
        <span data-scope="spinner" data-part="ring" data-slot="spinner-ring"></span>
      </span>
    </span>
  {/snippet}
</Spinner>