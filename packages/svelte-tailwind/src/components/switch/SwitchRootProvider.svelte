<script module lang="ts">
  import type { SwitchRootProviderProps as ArkSwitchRootProviderProps } from '@ark-ui/svelte/switch';
  import type { SwitchSize } from './Switch.svelte';

  export interface SwitchRootProviderProps extends ArkSwitchRootProviderProps {
    size?: SwitchSize;
  }
</script>

<script lang="ts">
  import { SwitchRootProvider } from '@ark-ui/svelte/switch';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    ref = $bindable(null),
    size = 'md',
    ...props
  }: SwitchRootProviderProps = $props();
</script>

<SwitchRootProvider
  {...props}
  bind:ref
  class={cn(
    'group/switch inline-flex w-fit cursor-pointer items-center gap-2 align-middle text-foreground data-disabled:cursor-default data-disabled:opacity-disabled data-readonly:cursor-default',
    className,
  )}
  data-size={size}
  data-slot="switch-root-provider"
/>