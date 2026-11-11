<script lang="ts">
  import { CheckboxGroup, type CheckboxGroupProps } from '@ark-ui/svelte/checkbox';
  import { clsx } from 'clsx';
  import styles from './Checkbox.module.css';

  let {
    class: className,
    value = $bindable(),
    ref = $bindable(null),
    ...props
  }: CheckboxGroupProps = $props();
</script>

<CheckboxGroup
  {...props}
  bind:ref
  bind:value
  class={clsx(styles.group, className)}
  data-slot="checkbox-group"
/>