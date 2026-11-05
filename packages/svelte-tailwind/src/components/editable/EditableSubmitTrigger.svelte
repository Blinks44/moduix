<script lang="ts">
  import { EditableSubmitTrigger, type EditableSubmitTriggerProps } from '@ark-ui/svelte/editable';
  import { cn } from '@/lib/moduix/cn';
  import { CheckIcon } from '@/lib/moduix/icons/ui';

  const triggerClass =
    'inline-flex size-control-md shrink-0 cursor-pointer items-center justify-center rounded-sm border border-border bg-background text-foreground outline-focus-inset outline-offset-focus-inset outline-transparent transition-[background-color,outline-color] duration-normal ease-in-out focus-visible:outline-ring active:bg-accent disabled:pointer-events-none [&>svg]:size-4 [&>svg]:shrink-0 [@media(hover:hover)]:hover:bg-accent';

  let {
    asChild,
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: EditableSubmitTriggerProps = $props();
</script>

<EditableSubmitTrigger
  {...props}
  bind:ref
  {asChild}
  class={cn(!asChild && triggerClass, className)}
  data-slot="editable-submit-trigger"
>
  {#if children}
    {@render children()}
  {:else}
    <CheckIcon />
  {/if}
</EditableSubmitTrigger>