<script lang="ts">
  import { RadioGroupItem, type RadioGroupItemProps } from '@ark-ui/svelte/radio-group';
  import { clsx } from 'clsx';
  import styles from './RadioGroup.module.css';

  let { class: className, ref = $bindable(null), ...props }: RadioGroupItemProps = $props();
</script>

<RadioGroupItem
  {...props}
  bind:ref
  class={clsx(styles.item, className)}
  data-slot="radio-group-item"
/>