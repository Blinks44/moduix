<script module lang="ts">
  import type { SwitchRootProps as ArkSwitchRootProps } from '@ark-ui/svelte/switch';

  export type SwitchSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  export interface SwitchRootProps extends ArkSwitchRootProps {
    size?: SwitchSize;
  }
</script>

<script lang="ts">
  import { SwitchRoot } from '@ark-ui/svelte/switch';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    checked = $bindable(),
    ref = $bindable(null),
    size = 'md',
    ...props
  }: SwitchRootProps = $props();
</script>

<SwitchRoot
  {...props}
  bind:ref
  bind:checked
  class={cn(
    'group/switch inline-flex w-fit cursor-pointer items-center gap-2 align-middle text-foreground data-disabled:cursor-default data-disabled:opacity-disabled data-readonly:cursor-default',
    className,
  )}
  data-size={size}
  data-slot="switch-root"
/>