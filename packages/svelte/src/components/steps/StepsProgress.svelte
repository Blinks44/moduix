<script lang="ts">
  import { StepsProgress, type StepsProgressProps } from '@ark-ui/svelte/steps';
  import { clsx } from 'clsx';
  import styles from './Steps.module.css';

  let { class: className, ref = $bindable(null), ...props }: StepsProgressProps = $props();
</script>

<StepsProgress
  {...props}
  bind:ref
  class={clsx(styles.progress, className)}
  data-slot="steps-progress"
/>