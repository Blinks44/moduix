<script lang="ts">
  import { DrawerCloseTrigger, type DrawerCloseTriggerProps } from '@ark-ui/svelte/drawer';
  import { a11yLabels } from '@/lib/moduix/a11yLabels';
  import { cn } from '@/lib/moduix/cn';
  import CloseButton from '../close-button/CloseButton.svelte';

  let {
    children,
    class: className,
    ref = $bindable(null),
    'aria-label': ariaLabel,
    ...props
  }: Omit<DrawerCloseTriggerProps, 'asChild'> = $props();

  const closeIconClass =
    'rounded-md [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-accent [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-popover-foreground';
</script>

<DrawerCloseTrigger {...props} bind:ref>
  {#snippet asChild(triggerProps)}
    <CloseButton
      {...triggerProps()}
      aria-label={ariaLabel ?? a11yLabels.closeDrawer}
      class={cn(closeIconClass, className)}
      data-slot="drawer-close-icon"
      {children}
    />
  {/snippet}
</DrawerCloseTrigger>