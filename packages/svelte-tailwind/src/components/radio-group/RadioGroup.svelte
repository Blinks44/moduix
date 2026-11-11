<script module lang="ts">
  import type { RadioGroupRootProps as ArkRadioGroupRootProps } from '@ark-ui/svelte/radio-group';

  export type RadioGroupSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  export interface RadioGroupRootProps extends ArkRadioGroupRootProps {
    size?: RadioGroupSize;
  }
</script>

<script lang="ts">
  import { RadioGroupRoot } from '@ark-ui/svelte/radio-group';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    value = $bindable(),
    ref = $bindable(null),
    size = 'md',
    ...props
  }: RadioGroupRootProps = $props();
</script>

<RadioGroupRoot
  {...props}
  bind:ref
  bind:value
  class={cn('group/radio-group flex flex-col gap-2 text-foreground', className)}
  data-size={size}
  data-slot="radio-group-root"
/>