<script lang="ts">
  import { StepsNextTrigger, type StepsNextTriggerProps } from '@ark-ui/svelte/steps';
  import { clsx } from 'clsx';
  import styles from './Steps.module.css';

  let { class: className, ref = $bindable(null), ...props }: StepsNextTriggerProps = $props();
</script>

<StepsNextTrigger
  {...props}
  bind:ref
  class={clsx(styles.nextTrigger, className)}
  data-slot="steps-next-trigger"
/>