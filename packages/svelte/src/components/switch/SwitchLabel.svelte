<script lang="ts">
  import { SwitchLabel, type SwitchLabelProps } from '@ark-ui/svelte/switch';
  import { clsx } from 'clsx';
  import styles from './Switch.module.css';

  let { class: className, ref = $bindable(null), ...props }: SwitchLabelProps = $props();
</script>

<SwitchLabel {...props} bind:ref class={clsx(styles.label, className)} data-slot="switch-label" />