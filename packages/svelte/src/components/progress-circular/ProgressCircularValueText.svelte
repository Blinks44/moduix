<script lang="ts">
  import { ProgressValueText, type ProgressValueTextProps } from '@ark-ui/svelte/progress';
  import { clsx } from 'clsx';
  import styles from './ProgressCircular.module.css';

  let { class: className, ref = $bindable(null), ...props }: ProgressValueTextProps = $props();
</script>

<ProgressValueText
  {...props}
  bind:ref
  class={clsx(styles.valueText, className)}
  data-slot="progress-circular-value-text"
/>