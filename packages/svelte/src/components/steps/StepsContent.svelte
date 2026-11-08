<script lang="ts">
  import { StepsContent, type StepsContentProps } from '@ark-ui/svelte/steps';
  import { clsx } from 'clsx';
  import styles from './Steps.module.css';

  let { class: className, ref = $bindable(null), ...props }: StepsContentProps = $props();
</script>

<StepsContent
  {...props}
  bind:ref
  class={clsx(styles.content, className)}
  data-slot="steps-content"
/>