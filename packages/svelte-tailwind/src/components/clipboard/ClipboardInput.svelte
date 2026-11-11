<script lang="ts">
  import { ClipboardInput, type ClipboardInputProps } from '@ark-ui/svelte/clipboard';
  import { cn } from '@/lib/moduix/cn';
  const inputClass =
    'min-h-control-md w-full min-w-0 rounded-md border border-border bg-background px-3 py-1 text-md leading-6 text-foreground outline-focus-inset outline-offset-focus-inset outline-transparent transition duration-normal ease-in-out placeholder:text-muted-foreground focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-disabled';

  let {
    asChild,
    class: className,
    ref = $bindable(null),
    ...props
  }: ClipboardInputProps = $props();
</script>

<ClipboardInput
  {...props}
  bind:ref
  {asChild}
  class={cn(!asChild && inputClass, className)}
  data-slot="clipboard-input"
/>