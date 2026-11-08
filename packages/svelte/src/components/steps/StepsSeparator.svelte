<script lang="ts">
  import { StepsSeparator, type StepsSeparatorProps } from '@ark-ui/svelte/steps';
  import { clsx } from 'clsx';
  import styles from './Steps.module.css';

  let { class: className, ref = $bindable(null), ...props }: StepsSeparatorProps = $props();
</script>

<StepsSeparator
  {...props}
  bind:ref
  class={clsx(styles.separator, className)}
  data-slot="steps-separator"
/>