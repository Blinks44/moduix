<script lang="ts">
  import { TocNav, type TocNavProps } from '@ark-ui/svelte/toc';
  import { clsx } from 'clsx';
  import styles from './Toc.module.css';

  let { class: className, ref = $bindable(null), ...props }: TocNavProps = $props();
</script>

<TocNav {...props} bind:ref class={clsx(styles.nav, className)} data-slot="toc-nav" />