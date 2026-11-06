<script lang="ts">
  import { PopoverTitle, type PopoverTitleProps } from '@ark-ui/svelte/popover';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: PopoverTitleProps = $props();
</script>

<PopoverTitle
  {...props}
  bind:ref
  class={cn('text-md font-semibold', className)}
  data-slot="popover-title"
/>