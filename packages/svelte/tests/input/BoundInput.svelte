<script lang="ts">
  import { Input } from '@/components/input';

  let { asChild = false, changes }: { asChild?: boolean; changes: string[] } = $props();
  let value = $state('initial');

  export const setValue = (next: string) => (value = next);
</script>

{#if asChild}
  <Input bind:value oninput={(event) => changes.push(event.currentTarget.value)}>
    {#snippet asChild(props)}
      <input {...props()} aria-label="Project key" />
    {/snippet}
  </Input>
{:else}
  <Input
    bind:value
    oninput={(event) => changes.push(event.currentTarget.value)}
    aria-label="Project key"
  />
{/if}
<output>{value}</output>