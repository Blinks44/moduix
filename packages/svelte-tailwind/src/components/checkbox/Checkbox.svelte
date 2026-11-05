<script module lang="ts">
  import type { CheckboxRootProps as ArkCheckboxRootProps } from '@ark-ui/svelte/checkbox';

  export type CheckboxSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  export interface CheckboxRootProps extends ArkCheckboxRootProps {
    size?: CheckboxSize;
  }
</script>

<script lang="ts">
  import { CheckboxRoot } from '@ark-ui/svelte/checkbox';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    checked = $bindable(),
    ref = $bindable(null),
    size = 'md',
    ...props
  }: CheckboxRootProps = $props();
</script>

<CheckboxRoot
  {...props}
  bind:ref
  bind:checked
  class={cn(
    'group/checkbox inline-flex cursor-pointer items-center gap-2 align-middle text-foreground data-disabled:cursor-default data-disabled:opacity-disabled data-readonly:cursor-default',
    className,
  )}
  data-size={size}
  data-slot="checkbox-root"
/>