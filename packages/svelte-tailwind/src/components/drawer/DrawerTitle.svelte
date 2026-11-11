<script lang="ts">
  import { DrawerTitle, type DrawerTitleProps } from '@ark-ui/svelte/drawer';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: DrawerTitleProps = $props();
</script>

<DrawerTitle
  {...props}
  bind:ref
  class={cn('text-lg font-semibold', className)}
  data-slot="drawer-title"
/>