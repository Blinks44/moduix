<script lang="ts">
  import { useLightboxContext } from '@moduix/svelte/lightbox';
  const dialog = useLightboxContext();
</script>

<div data-preview-meta>
  <output>Preview is {dialog().open ? 'open' : 'closed'}</output>
</div>