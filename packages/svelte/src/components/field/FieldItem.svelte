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
  import { clsx } from 'clsx';
  import styles from './Field.module.css';

  let {
    children,
    class: className,
    ref = $bindable(null),
    value,
    ...props
  }: FieldItemProps = $props();
</script>

<FieldItem {value}>
  <div {...props} bind:this={ref} class={clsx(styles.item, className)} data-slot="field-item">
    {@render children?.()}
  </div>
</FieldItem>