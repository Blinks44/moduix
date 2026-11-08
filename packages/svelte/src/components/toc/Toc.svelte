<script lang="ts">
  import { TocRoot, type TocRootProps } from '@ark-ui/svelte/toc';
  import { clsx } from 'clsx';
  import styles from './Toc.module.css';

  let {
    activeIds = $bindable(),
    autoScroll = false,
    class: className,
    ref = $bindable(null),
    ...props
  }: TocRootProps = $props();
</script>

<TocRoot
  {...props}
  bind:ref
  bind:activeIds
  class={clsx(styles.root, className)}
  {autoScroll}
  data-slot="toc-root"
/>