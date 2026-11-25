<script lang="ts">
  import { CheckboxIndicator, type CheckboxIndicatorProps } from '@ark-ui/svelte/checkbox';
  import { clsx } from 'clsx';
  import { UiIcon } from '@/lib/moduix/icons/ui';
  import styles from './Checkbox.module.css';

  let {
    children,
    class: className,
    indeterminate,
    ref = $bindable(null),
    ...props
  }: CheckboxIndicatorProps = $props();
</script>

<CheckboxIndicator
  {...props}
  bind:ref
  {indeterminate}
  class={clsx(styles.indicator, className)}
  data-slot="checkbox-indicator"
>
  {#if children}
    {@render children()}
  {:else if indeterminate}
    <UiIcon icon="indeterminate" />
  {:else}
    <UiIcon icon="check" />
  {/if}
</CheckboxIndicator>