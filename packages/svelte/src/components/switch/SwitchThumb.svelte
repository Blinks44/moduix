<script lang="ts">
  import { SwitchThumb, type SwitchThumbProps } from '@ark-ui/svelte/switch';
  import { clsx } from 'clsx';
  import styles from './Switch.module.css';

  let { class: className, ref = $bindable(null), ...props }: SwitchThumbProps = $props();
</script>

<SwitchThumb {...props} bind:ref class={clsx(styles.thumb, className)} data-slot="switch-thumb" />