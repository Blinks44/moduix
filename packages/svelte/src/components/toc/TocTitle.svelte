<script lang="ts">
  import { TocTitle, type TocTitleProps } from '@ark-ui/svelte/toc';
  import { clsx } from 'clsx';
  import styles from './Toc.module.css';

  let { class: className, ref = $bindable(null), ...props }: TocTitleProps = $props();
</script>

<TocTitle {...props} bind:ref class={clsx(styles.title, className)} data-slot="toc-title" />