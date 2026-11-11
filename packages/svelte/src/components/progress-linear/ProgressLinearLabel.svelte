<script lang="ts">
  import { ProgressLabel, type ProgressLabelProps } from '@ark-ui/svelte/progress';
  import { clsx } from 'clsx';
  import styles from './ProgressLinear.module.css';

  let { class: className, ref = $bindable(null), ...props }: ProgressLabelProps = $props();
</script>

<ProgressLabel
  {...props}
  bind:ref
  class={clsx(styles.label, className)}
  data-slot="progress-linear-label"
/>