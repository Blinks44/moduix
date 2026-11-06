<script lang="ts">
  import { useLightboxContext } from '@/components/lightbox';

  const dialog = useLightboxContext();
</script>

<output>Open: {dialog().open}</output>