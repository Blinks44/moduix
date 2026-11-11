<script lang="ts">
  import { SplitterRootProvider, type SplitterRootProviderProps } from '@ark-ui/svelte/splitter';
  import { clsx } from 'clsx';
  import styles from './Splitter.module.css';

  let {
    class: className,
    ref = $bindable(null),
    style,
    ...props
  }: SplitterRootProviderProps = $props();

  // Ark sets inline width and height of 100%; clear them so consumer sizes and classes apply.
  const rootStyle = $derived(['width:', 'height:', style].filter(Boolean).join(';'));
</script>

<SplitterRootProvider
  {...props}
  bind:ref
  class={clsx(styles.root, className)}
  style={rootStyle}
  data-slot="splitter-root-provider"
/>