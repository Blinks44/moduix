<script lang="ts">
  import { MarqueeRootProvider, type MarqueeRootProviderProps } from '@ark-ui/svelte/marquee';
  import { clsx } from 'clsx';
  import styles from './Marquee.module.css';

  let { class: className, ref = $bindable(null), ...props }: MarqueeRootProviderProps = $props();
</script>

<MarqueeRootProvider
  {...props}
  bind:ref
  class={clsx(styles.root, className)}
  data-slot="marquee-root-provider"
/>