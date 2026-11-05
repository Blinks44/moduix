<script lang="ts">
  import { Textarea } from '@/components/textarea';

  let { asChild = false }: { asChild?: boolean } = $props();
  let textareaRef: Element | null = $state(null);

  export const getRef = () => textareaRef;
</script>

{#if asChild}
  <Textarea bind:ref={textareaRef}>
    {#snippet asChild(props)}
      <textarea {...props()} name="summary" aria-label="Repository summary"></textarea>
    {/snippet}
  </Textarea>
{:else}
  <Textarea bind:ref={textareaRef} aria-label="Repository summary" />
{/if}