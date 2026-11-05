<script lang="ts">
  import {
    RadioGroupItemControl,
    type RadioGroupItemControlProps,
  } from '@ark-ui/svelte/radio-group';
  import { clsx } from 'clsx';
  import styles from './RadioGroup.module.css';

  let { class: className, ref = $bindable(null), ...props }: RadioGroupItemControlProps = $props();
</script>

<RadioGroupItemControl
  {...props}
  bind:ref
  class={clsx(styles.itemControl, className)}
  data-slot="radio-group-item-control"
/>