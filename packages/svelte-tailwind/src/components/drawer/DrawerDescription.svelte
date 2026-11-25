<script lang="ts">
  import { DrawerDescription, type DrawerDescriptionProps } from '@ark-ui/svelte/drawer';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: DrawerDescriptionProps = $props();
</script>

<DrawerDescription
  {...props}
  bind:ref
  class={cn('text-base text-muted-foreground', className)}
  data-slot="drawer-description"
/>