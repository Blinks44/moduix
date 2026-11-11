<script lang="ts">
  import { MarqueeContent, type MarqueeContentProps } from '@ark-ui/svelte/marquee';
  import { clsx } from 'clsx';
  import styles from './Marquee.module.css';

  let { class: className, ref = $bindable(null), ...props }: MarqueeContentProps = $props();
</script>

<MarqueeContent
  {...props}
  bind:ref
  class={clsx(styles.content, className)}
  data-slot="marquee-content"
/>