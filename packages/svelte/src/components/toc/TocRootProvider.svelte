<script lang="ts">
  import { TocRootProvider, type TocRootProviderProps } from '@ark-ui/svelte/toc';
  import { clsx } from 'clsx';
  import styles from './Toc.module.css';

  let { class: className, ref = $bindable(null), ...props }: TocRootProviderProps = $props();
</script>

<TocRootProvider
  {...props}
  bind:ref
  class={clsx(styles.root, className)}
  data-slot="toc-root-provider"
/>