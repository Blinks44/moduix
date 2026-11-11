<script lang="ts">
  import { useLightboxContext } from '@moduix/svelte/lightbox';
  const dialog = useLightboxContext();
</script>

<output>Preview is {dialog().open ? 'open' : 'closed'}</output>