<script lang="ts">
  import { MenuSeparator, type MenuSeparatorProps } from '@ark-ui/svelte/menu';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: MenuSeparatorProps = $props();
</script>

<MenuSeparator
  {...props}
  bind:ref
  class={cn('mx-3 my-1.5 h-px border-0 bg-border', className)}
  data-slot="menu-separator"
/>