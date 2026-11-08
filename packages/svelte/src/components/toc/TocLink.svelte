<script lang="ts">
  import { TocLink, type TocLinkProps } from '@ark-ui/svelte/toc';
  import { clsx } from 'clsx';
  import styles from './Toc.module.css';

  let { class: className, ref = $bindable(null), ...props }: TocLinkProps = $props();
</script>

<TocLink {...props} bind:ref class={clsx(styles.link, className)} data-slot="toc-link" />