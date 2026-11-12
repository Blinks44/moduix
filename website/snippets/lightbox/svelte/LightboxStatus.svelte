<script lang="ts">
  import { useLightboxContext } from '@moduix/svelte/lightbox';
  import styles from '@/components/examples/lightbox/lightbox-root-provider-and-context.module.css';
  const dialog = useLightboxContext();
</script>

<div data-preview-meta>
  <output class={styles.status}>Preview is {dialog().open ? 'open' : 'closed'}</output>
</div>