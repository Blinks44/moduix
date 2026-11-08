<script lang="ts">
  import { ProgressRootProvider, type ProgressRootProviderProps } from '@ark-ui/svelte/progress';
  import { clsx } from 'clsx';
  import styles from './ProgressCircular.module.css';

  let { class: className, ref = $bindable(null), ...props }: ProgressRootProviderProps = $props();
</script>

<ProgressRootProvider
  {...props}
  bind:ref
  class={clsx(styles.root, className)}
  data-slot="progress-circular-root-provider"
/>