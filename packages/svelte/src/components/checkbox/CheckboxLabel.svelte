<script lang="ts">
  import { CheckboxLabel, type CheckboxLabelProps } from '@ark-ui/svelte/checkbox';
  import { clsx } from 'clsx';
  import styles from './Checkbox.module.css';

  let { class: className, ref = $bindable(null), ...props }: CheckboxLabelProps = $props();
</script>

<CheckboxLabel
  {...props}
  bind:ref
  class={clsx(styles.label, className)}
  data-slot="checkbox-label"
/>