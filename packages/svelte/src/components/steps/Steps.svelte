<script lang="ts">
  import { StepsRoot, type StepsRootProps } from '@ark-ui/svelte/steps';
  import { clsx } from 'clsx';
  import styles from './Steps.module.css';

  let {
    class: className,
    ref = $bindable(null),
    step = $bindable(),
    ...props
  }: StepsRootProps = $props();
</script>

<StepsRoot
  {...props}
  bind:ref
  bind:step
  class={clsx(styles.root, className)}
  data-slot="steps-root"
/>