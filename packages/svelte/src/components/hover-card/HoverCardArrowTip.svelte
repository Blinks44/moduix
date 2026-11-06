<script lang="ts">
  import { HoverCardArrowTip, type HoverCardArrowTipProps } from '@ark-ui/svelte/hover-card';
  import { clsx } from 'clsx';
  import styles from './HoverCard.module.css';

  let { class: className, ref = $bindable(null), ...props }: HoverCardArrowTipProps = $props();
</script>

<HoverCardArrowTip
  {...props}
  bind:ref
  class={clsx(styles.arrowTip, className)}
  data-slot="hover-card-arrow-tip"
/>