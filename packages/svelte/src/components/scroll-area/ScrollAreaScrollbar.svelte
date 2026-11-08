<script lang="ts">
  import { ScrollAreaScrollbar, type ScrollAreaScrollbarProps } from '@ark-ui/svelte/scroll-area';
  import { clsx } from 'clsx';
  import styles from './ScrollArea.module.css';

  let { class: className, ref = $bindable(null), ...props }: ScrollAreaScrollbarProps = $props();
</script>

<ScrollAreaScrollbar
  {...props}
  bind:ref
  class={clsx(styles.scrollbar, className)}
  data-slot="scroll-area-scrollbar"
/>