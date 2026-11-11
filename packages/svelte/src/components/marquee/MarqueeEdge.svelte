<script lang="ts">
  import { MarqueeEdge, type MarqueeEdgeProps } from '@ark-ui/svelte/marquee';
  import { clsx } from 'clsx';
  import styles from './Marquee.module.css';

  let { class: className, ref = $bindable(null), ...props }: MarqueeEdgeProps = $props();
</script>

<MarqueeEdge {...props} bind:ref class={clsx(styles.edge, className)} data-slot="marquee-edge" />