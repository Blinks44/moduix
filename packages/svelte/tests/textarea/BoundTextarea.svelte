<script lang="ts">
  import { Textarea } from '@/components/textarea';

  let { asChild = false, changes }: { asChild?: boolean; changes: string[] } = $props();
  let value = $state('Draft');

  export const setValue = (next: string) => (value = next);
</script>

{#if asChild}
  <Textarea bind:value oninput={(event) => changes.push(event.currentTarget.value)}>
    {#snippet asChild(props)}
      <textarea {...props()} aria-label="Summary"></textarea>
    {/snippet}
  </Textarea>
{:else}
  <Textarea
    bind:value
    oninput={(event) => changes.push(event.currentTarget.value)}
    aria-label="Summary"
  />
{/if}
<output>{value}</output>