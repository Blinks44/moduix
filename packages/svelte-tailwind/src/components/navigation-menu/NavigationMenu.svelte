<script lang="ts">
  import { NavigationMenuRoot, type NavigationMenuRootProps } from '@ark-ui/svelte/navigation-menu';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    ref = $bindable(null),
    value = $bindable(),
    ...props
  }: NavigationMenuRootProps = $props();

  const rootClass = 'relative flex w-fit max-w-full min-w-0 text-foreground';
</script>

<NavigationMenuRoot
  {...props}
  bind:ref
  bind:value
  class={cn(rootClass, className)}
  data-slot="navigation-menu-root"
/>