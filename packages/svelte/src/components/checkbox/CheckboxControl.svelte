<script lang="ts">
  import { CheckboxControl, type CheckboxControlProps } from '@ark-ui/svelte/checkbox';
  import { clsx } from 'clsx';
  import styles from './Checkbox.module.css';
  import CheckboxIndicator from './CheckboxIndicator.svelte';

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: CheckboxControlProps = $props();
</script>

<CheckboxControl
  {...props}
  bind:ref
  class={clsx(styles.control, className)}
  data-slot="checkbox-control"
>
  {#if children}
    {@render children()}
  {:else}
    <CheckboxIndicator />
    <CheckboxIndicator indeterminate />
  {/if}
</CheckboxControl>