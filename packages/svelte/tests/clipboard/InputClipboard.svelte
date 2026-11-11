<script lang="ts">
  import type { PropsFn } from '@ark-ui/svelte';
  import { Clipboard, ClipboardInput, ClipboardLabel } from '@/components/clipboard';

  let {
    asChild = false,
    clicked,
    inputClass,
    title,
  }: {
    asChild?: boolean;
    clicked?: () => void;
    inputClass: string;
    title: string;
  } = $props();

  let inputRef = $state<HTMLInputElement | null>(null);

  export const getRefs = () => ({ inputRef });
</script>

{#snippet readonlyInput(props: PropsFn<'input'>)}
  <input {...props()} readonly />
{/snippet}

<Clipboard defaultValue="clipboard-code">
  <ClipboardLabel>Code</ClipboardLabel>
  <ClipboardInput
    bind:ref={inputRef}
    asChild={asChild ? readonlyInput : undefined}
    class={inputClass}
    {title}
    style="color: red"
    data-testid="clipboard-input"
    onclick={clicked}
  />
</Clipboard>