<script lang="ts">
  import { TocItem, type TocItemProps } from '@ark-ui/svelte/toc';
  import { clsx } from 'clsx';
  import styles from './Toc.module.css';

  let { class: className, ref = $bindable(null), ...props }: TocItemProps = $props();
</script>

<TocItem {...props} bind:ref class={clsx(styles.item, className)} data-slot="toc-item" />