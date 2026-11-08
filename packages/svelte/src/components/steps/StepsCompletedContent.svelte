<script lang="ts">
  import { StepsCompletedContent, type StepsCompletedContentProps } from '@ark-ui/svelte/steps';
  import { clsx } from 'clsx';
  import styles from './Steps.module.css';

  let { class: className, ref = $bindable(null), ...props }: StepsCompletedContentProps = $props();
</script>

<StepsCompletedContent
  {...props}
  bind:ref
  class={clsx(styles.completedContent, className)}
  data-slot="steps-completed-content"
/>