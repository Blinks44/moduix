<script lang="ts">
  import { PinInputControl, type PinInputControlProps } from '@ark-ui/svelte/pin-input';
  import { clsx } from 'clsx';
  import styles from './PinInput.module.css';

  let { class: className, ref = $bindable(null), ...props }: PinInputControlProps = $props();
</script>

<PinInputControl
  {...props}
  bind:ref
  class={clsx(styles.control, className)}
  data-slot="pin-input-control"
/>