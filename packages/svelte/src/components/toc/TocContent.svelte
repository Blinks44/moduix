<script lang="ts">
  import { TocContent, type TocContentProps } from '@ark-ui/svelte/toc';
  import { clsx } from 'clsx';
  import styles from './Toc.module.css';

  let { class: className, ref = $bindable(null), ...props }: TocContentProps = $props();
</script>

<TocContent {...props} bind:ref class={clsx(styles.content, className)} data-slot="toc-content" />