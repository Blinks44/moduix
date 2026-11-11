<script lang="ts">
  import { Skeleton } from '@/components/skeleton';
</script>

<Skeleton boxSize={48} class="hydrated-skeleton" style="width: 60px; border-radius: 12px">
  {#snippet asChild(props)}
    <section {...props()} aria-label="Profile" data-testid="hydrated-skeleton">
      <strong>Ada Lovelace</strong>
    </section>
  {/snippet}
</Skeleton>