<script lang="ts">
  import { MenuArrowTip, type MenuArrowTipProps } from '@ark-ui/svelte/menu';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: MenuArrowTipProps = $props();
</script>

<MenuArrowTip
  {...props}
  bind:ref
  class={cn(
    '[border-block-start:1px_solid_var(--color-border)] [border-inline-start:1px_solid_var(--color-border)]',
    className,
  )}
  data-slot="menu-arrow-tip"
/>