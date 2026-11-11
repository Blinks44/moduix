<script lang="ts">
  import { PinInputInput, type PinInputInputProps } from '@ark-ui/svelte/pin-input';
  import { clsx } from 'clsx';
  import styles from './PinInput.module.css';

  let { class: className, ref = $bindable(null), ...props }: PinInputInputProps = $props();
</script>

<PinInputInput
  {...props}
  bind:ref
  class={clsx(styles.input, className)}
  data-slot="pin-input-input"
/>