<script lang="ts">
  import { ClipboardTrigger, type ClipboardTriggerProps } from '@ark-ui/svelte/clipboard';
  import { cn } from '@/lib/moduix/cn';
  const triggerClass =
    'inline-flex min-h-control-md shrink-0 cursor-pointer appearance-none items-center justify-center gap-2 rounded-md border border-border bg-background px-4 text-sm leading-5 font-medium whitespace-nowrap text-foreground transition duration-normal ease-in-out select-none focus-visible:outline-focus focus-visible:outline-offset-focus-inset focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-disabled [&_svg]:size-4 [&_svg]:shrink-0 [&:active:not(:disabled)]:opacity-[0.94] [@media(hover:hover)]:[&:not(:disabled):hover]:bg-accent';

  let {
    asChild,
    class: className,
    ref = $bindable(null),
    ...props
  }: ClipboardTriggerProps = $props();
</script>

<ClipboardTrigger
  {...props}
  bind:ref
  {asChild}
  class={cn(!asChild && triggerClass, className)}
  data-slot="clipboard-trigger"
/>