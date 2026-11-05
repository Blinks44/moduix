<script lang="ts">
  import { EditableCancelTrigger, type EditableCancelTriggerProps } from '@ark-ui/svelte/editable';
  import { cn } from '@/lib/moduix/cn';
  import { CloseIcon } from '@/lib/moduix/icons/ui';

  const triggerClass =
    'inline-flex size-control-md shrink-0 cursor-pointer items-center justify-center rounded-sm border border-border bg-background text-foreground outline-focus-inset outline-offset-focus-inset outline-transparent transition-[background-color,outline-color] duration-normal ease-in-out focus-visible:outline-ring active:bg-accent disabled:pointer-events-none [&>svg]:size-4 [&>svg]:shrink-0 [@media(hover:hover)]:hover:bg-accent';

  let {
    asChild,
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: EditableCancelTriggerProps = $props();
</script>

<EditableCancelTrigger
  {...props}
  bind:ref
  {asChild}
  class={cn(!asChild && triggerClass, className)}
  data-slot="editable-cancel-trigger"
>
  {#if children}
    {@render children()}
  {:else}
    <CloseIcon />
  {/if}
</EditableCancelTrigger>