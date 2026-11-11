<script lang="ts">
  import { MarqueeRoot, type MarqueeRootProps } from '@ark-ui/svelte/marquee';
  import { clsx } from 'clsx';
  import styles from './Marquee.module.css';

  let {
    class: className,
    paused = $bindable(),
    ref = $bindable(null),
    ...props
  }: MarqueeRootProps = $props();
</script>

<MarqueeRoot
  {...props}
  bind:paused
  bind:ref
  class={clsx(styles.root, className)}
  data-slot="marquee-root"
/>