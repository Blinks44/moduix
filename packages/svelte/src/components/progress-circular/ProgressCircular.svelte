<script lang="ts">
  import { ProgressRoot, type ProgressRootProps } from '@ark-ui/svelte/progress';
  import { clsx } from 'clsx';
  import styles from './ProgressCircular.module.css';

  let {
    class: className,
    ref = $bindable(null),
    value = $bindable(),
    ...props
  }: ProgressRootProps = $props();
</script>

<ProgressRoot
  {...props}
  bind:ref
  bind:value
  class={clsx(styles.root, className)}
  data-slot="progress-circular-root"
/>