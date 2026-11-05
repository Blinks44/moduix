<script module lang="ts">
  import type { FieldItemProps as ArkFieldItemProps } from '@ark-ui/svelte/field';
  import type { HTMLAttributes } from 'svelte/elements';

  export interface FieldItemProps
    extends ArkFieldItemProps, Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    ref?: HTMLDivElement | null;
  }
</script>

<script lang="ts">
  import { FieldItem } from '@ark-ui/svelte/field';
  import { cn } from '@/lib/moduix/cn';

  let {
    children,
    class: className,
    ref = $bindable(null),
    value,
    ...props
  }: FieldItemProps = $props();
</script>

<FieldItem {value}>
  <div {...props} bind:this={ref} class={cn('grid gap-1', className)} data-slot="field-item">
    {@render children?.()}
  </div>
</FieldItem>