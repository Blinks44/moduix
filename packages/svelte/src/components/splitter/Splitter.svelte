<script lang="ts">
  import { SplitterRoot, type SplitterRootProps } from '@ark-ui/svelte/splitter';
  import { clsx } from 'clsx';
  import styles from './Splitter.module.css';

  let {
    class: className,
    ref = $bindable(null),
    size = $bindable(),
    style,
    ...props
  }: SplitterRootProps = $props();

  // Ark sets inline width and height of 100%; clear them so consumer sizes and classes apply.
  const rootStyle = $derived(['width:', 'height:', style].filter(Boolean).join(';'));
</script>

<SplitterRoot
  {...props}
  bind:ref
  bind:size
  class={clsx(styles.root, className)}
  style={rootStyle}
  data-slot="splitter-root"
/>