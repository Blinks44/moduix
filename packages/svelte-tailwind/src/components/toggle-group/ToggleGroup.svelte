<script module lang="ts">
  import type { ToggleGroupRootProps as ArkToggleGroupRootProps } from '@ark-ui/svelte/toggle-group';
  import type { ToggleSize, ToggleVariant } from '../toggle/Toggle.svelte';

  export interface ToggleGroupRootProps extends ArkToggleGroupRootProps {
    size?: ToggleSize;
    variant?: ToggleVariant;
  }
</script>

<script lang="ts">
  import { ToggleGroupRoot } from '@ark-ui/svelte/toggle-group';
  import { cn } from '@/lib/moduix/cn';
  import { setToggleGroupStyleContext } from './context';
  import { toggleGroupRootVariants } from './ToggleGroup.variants';

  let {
    class: className,
    ref = $bindable(null),
    size = 'md',
    value = $bindable(),
    variant = 'default',
    ...props
  }: ToggleGroupRootProps = $props();

  setToggleGroupStyleContext({
    size: () => size,
    variant: () => variant,
  });
</script>

<ToggleGroupRoot
  {...props}
  bind:ref
  bind:value
  class={cn(toggleGroupRootVariants({ variant }), className)}
  data-size={size}
  data-variant={variant}
  data-slot="toggle-group-root"
/>