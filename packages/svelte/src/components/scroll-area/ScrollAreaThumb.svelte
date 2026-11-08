<script lang="ts">
  import { ScrollAreaThumb, type ScrollAreaThumbProps } from '@ark-ui/svelte/scroll-area';
  import { clsx } from 'clsx';
  import styles from './ScrollArea.module.css';

  let { class: className, ref = $bindable(null), ...props }: ScrollAreaThumbProps = $props();
</script>

<ScrollAreaThumb
  {...props}
  bind:ref
  class={clsx(styles.thumb, className)}
  data-slot="scroll-area-thumb"
/>