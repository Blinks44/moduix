<script lang="ts">
  import {
    StepsIndicator,
    useStepsItemContext,
    type StepsIndicatorProps,
  } from '@ark-ui/svelte/steps';
  import { clsx } from 'clsx';
  import { CheckIcon } from '@/lib/moduix/icons/ui';
  import styles from './Steps.module.css';

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: StepsIndicatorProps = $props();

  const item = useStepsItemContext();
</script>

<StepsIndicator
  {...props}
  bind:ref
  class={clsx(styles.indicator, className)}
  data-slot="steps-indicator"
>
  {#if children}
    {@render children()}
  {:else if item().completed}
    <CheckIcon />
  {:else}
    {item().index + 1}
  {/if}
</StepsIndicator>