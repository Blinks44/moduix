<script lang="ts">
  import { NumberInputControl, type NumberInputControlProps } from '@ark-ui/svelte/number-input';
  import { clsx } from 'clsx';
  import styles from './NumberInput.module.css';

  let { class: className, ref = $bindable(null), ...props }: NumberInputControlProps = $props();
</script>

<NumberInputControl
  {...props}
  bind:ref
  class={clsx(styles.control, className)}
  data-slot="number-input-control"
/>