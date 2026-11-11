<script lang="ts">
  import { PinInputLabel, type PinInputLabelProps } from '@ark-ui/svelte/pin-input';
  import { clsx } from 'clsx';
  import styles from './PinInput.module.css';

  let { class: className, ref = $bindable(null), ...props }: PinInputLabelProps = $props();
</script>

<PinInputLabel
  {...props}
  bind:ref
  class={clsx(styles.label, className)}
  data-slot="pin-input-label"
/>