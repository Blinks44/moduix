<script module lang="ts">
  import type { CheckboxRootProviderProps as ArkCheckboxRootProviderProps } from '@ark-ui/svelte/checkbox';
  import type { CheckboxSize } from './Checkbox.svelte';

  export interface CheckboxRootProviderProps extends ArkCheckboxRootProviderProps {
    size?: CheckboxSize;
  }
</script>

<script lang="ts">
  import { CheckboxRootProvider } from '@ark-ui/svelte/checkbox';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    ref = $bindable(null),
    size = 'md',
    ...props
  }: CheckboxRootProviderProps = $props();
</script>

<CheckboxRootProvider
  {...props}
  bind:ref
  class={cn(
    'group/checkbox inline-flex cursor-pointer items-center gap-2 align-middle text-foreground data-disabled:cursor-default data-disabled:opacity-disabled data-readonly:cursor-default',
    className,
  )}
  data-size={size}
  data-slot="checkbox-root-provider"
/>