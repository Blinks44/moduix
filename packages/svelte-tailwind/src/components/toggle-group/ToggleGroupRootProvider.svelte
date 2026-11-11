<script module lang="ts">
  import type { ToggleGroupRootProviderProps as ArkToggleGroupRootProviderProps } from '@ark-ui/svelte/toggle-group';
  import type { ToggleSize, ToggleVariant } from '../toggle/Toggle.svelte';

  export interface ToggleGroupRootProviderProps extends ArkToggleGroupRootProviderProps {
    size?: ToggleSize;
    variant?: ToggleVariant;
  }
</script>

<script lang="ts">
  import { ToggleGroupRootProvider } from '@ark-ui/svelte/toggle-group';
  import { cn } from '@/lib/moduix/cn';
  import { setToggleGroupStyleContext } from './context';
  import { toggleGroupRootVariants } from './ToggleGroup.variants';

  let {
    class: className,
    ref = $bindable(null),
    size = 'md',
    variant = 'default',
    ...props
  }: ToggleGroupRootProviderProps = $props();

  setToggleGroupStyleContext({
    size: () => size,
    variant: () => variant,
  });
</script>

<ToggleGroupRootProvider
  {...props}
  bind:ref
  class={cn(toggleGroupRootVariants({ variant }), className)}
  data-size={size}
  data-variant={variant}
  data-slot="toggle-group-root-provider"
/>