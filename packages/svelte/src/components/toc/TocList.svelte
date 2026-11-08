<script lang="ts">
  import { TocList, type TocListProps } from '@ark-ui/svelte/toc';
  import { clsx } from 'clsx';
  import styles from './Toc.module.css';

  let { class: className, ref = $bindable(null), ...props }: TocListProps = $props();
</script>

<TocList {...props} bind:ref class={clsx(styles.list, className)} data-slot="toc-list" />