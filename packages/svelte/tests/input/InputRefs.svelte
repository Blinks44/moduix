<script lang="ts">
  import { Input } from '@/components/input';

  let { asChild = false }: { asChild?: boolean } = $props();
  let inputRef: Element | null = $state(null);

  export const getRef = () => inputRef;
</script>

{#if asChild}
  <Input bind:ref={inputRef}>
    {#snippet asChild(props)}
      <input {...props()} name="repository" aria-label="Repository" />
    {/snippet}
  </Input>
{:else}
  <Input bind:ref={inputRef} aria-label="Repository" />
{/if}