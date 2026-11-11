<script lang="ts">
  import { MarqueeItem, type MarqueeItemProps } from '@ark-ui/svelte/marquee';
  import { clsx } from 'clsx';
  import styles from './Marquee.module.css';

  let { class: className, ref = $bindable(null), ...props }: MarqueeItemProps = $props();
</script>

<MarqueeItem {...props} bind:ref class={clsx(styles.item, className)} data-slot="marquee-item" />