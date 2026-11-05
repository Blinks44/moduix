<script lang="ts">
  import { RadioGroupLabel, type RadioGroupLabelProps } from '@ark-ui/svelte/radio-group';
  import { clsx } from 'clsx';
  import styles from './RadioGroup.module.css';

  let { class: className, ref = $bindable(null), ...props }: RadioGroupLabelProps = $props();
</script>

<RadioGroupLabel
  {...props}
  bind:ref
  class={clsx(styles.label, className)}
  data-slot="radio-group-label"
/>