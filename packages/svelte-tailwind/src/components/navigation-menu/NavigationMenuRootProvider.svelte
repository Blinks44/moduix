<script lang="ts">
  import {
    NavigationMenuRootProvider,
    type NavigationMenuRootProviderProps,
  } from '@ark-ui/svelte/navigation-menu';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: NavigationMenuRootProviderProps = $props();

  const rootClass = 'relative flex w-fit max-w-full min-w-0 text-foreground';
</script>

<NavigationMenuRootProvider
  {...props}
  bind:ref
  class={cn(rootClass, className)}
  data-slot="navigation-menu-root-provider"
/>