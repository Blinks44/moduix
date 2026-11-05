<script lang="ts">
  import { Spinner } from '@/components/spinner';
</script>

<Spinner size="lg" aria-label="Loading report">
  {#snippet asChild(props)}
    <span {...props()} data-testid="spinner-host">Loading report</span>
  {/snippet}
</Spinner>