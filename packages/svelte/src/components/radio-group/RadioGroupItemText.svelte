<script lang="ts">
  import { RadioGroupItemText, type RadioGroupItemTextProps } from '@ark-ui/svelte/radio-group';
  import { clsx } from 'clsx';
  import styles from './RadioGroup.module.css';

  let { class: className, ref = $bindable(null), ...props }: RadioGroupItemTextProps = $props();
</script>

<RadioGroupItemText
  {...props}
  bind:ref
  class={clsx(styles.itemText, className)}
  data-slot="radio-group-item-text"
/>