<script lang="ts">
  import { StepsPrevTrigger, type StepsPrevTriggerProps } from '@ark-ui/svelte/steps';
  import { clsx } from 'clsx';
  import styles from './Steps.module.css';

  let { class: className, ref = $bindable(null), ...props }: StepsPrevTriggerProps = $props();
</script>

<StepsPrevTrigger
  {...props}
  bind:ref
  class={clsx(styles.prevTrigger, className)}
  data-slot="steps-prev-trigger"
/>