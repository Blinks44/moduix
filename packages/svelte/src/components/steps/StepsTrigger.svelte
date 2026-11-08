<script lang="ts">
  import { StepsTrigger, type StepsTriggerProps } from '@ark-ui/svelte/steps';
  import { clsx } from 'clsx';
  import styles from './Steps.module.css';

  let { class: className, ref = $bindable(null), ...props }: StepsTriggerProps = $props();
</script>

<StepsTrigger
  {...props}
  bind:ref
  class={clsx(styles.trigger, className)}
  data-slot="steps-trigger"
/>