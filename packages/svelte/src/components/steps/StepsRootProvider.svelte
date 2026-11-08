<script lang="ts">
  import { StepsRootProvider, type StepsRootProviderProps } from '@ark-ui/svelte/steps';
  import { clsx } from 'clsx';
  import styles from './Steps.module.css';

  let { class: className, ref = $bindable(null), ...props }: StepsRootProviderProps = $props();
</script>

<StepsRootProvider
  {...props}
  bind:ref
  class={clsx(styles.root, className)}
  data-slot="steps-root-provider"
/>