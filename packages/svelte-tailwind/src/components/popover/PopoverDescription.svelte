<script lang="ts">
  import { PopoverDescription, type PopoverDescriptionProps } from '@ark-ui/svelte/popover';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: PopoverDescriptionProps = $props();
</script>

<PopoverDescription
  {...props}
  bind:ref
  class={cn('text-sm text-muted-foreground', className)}
  data-slot="popover-description"
/>