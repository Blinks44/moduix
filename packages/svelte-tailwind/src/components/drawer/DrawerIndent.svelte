<script lang="ts">
  import { DrawerIndent, type DrawerIndentProps } from '@ark-ui/svelte/drawer';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: DrawerIndentProps = $props();

  const indentClass =
    'relative origin-top [transition:transform_var(--moduix-transition-spring),border-radius_var(--moduix-transition-spring)] data-active:[transform:translateY(calc(var(--moduix-spacing-2)*(1-var(--drawer-swipe-progress,0))))_scale(calc(0.97+0.03*var(--drawer-swipe-progress,0)))] data-active:rounded-t-lg motion-reduce:[transition-duration:1ms]';
</script>

<DrawerIndent {...props} bind:ref class={cn(indentClass, className)} data-slot="drawer-indent" />