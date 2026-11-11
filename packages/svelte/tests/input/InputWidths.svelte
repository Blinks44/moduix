<script lang="ts">
  import { Input } from '@/components/input';

  let { narrow = false }: { narrow?: boolean } = $props();
</script>

{#if narrow}
  <div style="display: flex; width: 80px">
    <Input aria-label="Narrow" htmlSize={20} />
  </div>
{:else}
  <div style="width: 600px">
    <Input aria-label="Full width" />
    <Input aria-label="Four characters" htmlSize={4} />
  </div>
{/if}