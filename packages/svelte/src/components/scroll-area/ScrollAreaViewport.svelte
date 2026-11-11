<script lang="ts">
  import { ScrollAreaViewport, type ScrollAreaViewportProps } from '@ark-ui/svelte/scroll-area';
  import { clsx } from 'clsx';
  import styles from './ScrollArea.module.css';

  let { class: className, ref = $bindable(null), ...props }: ScrollAreaViewportProps = $props();
</script>

<ScrollAreaViewport
  {...props}
  bind:ref
  class={clsx(styles.viewport, className)}
  data-slot="scroll-area-viewport"
/>