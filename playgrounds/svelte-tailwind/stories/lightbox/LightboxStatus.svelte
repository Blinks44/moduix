<script lang="ts">
  const statusClass =
    'absolute bottom-3 start-1/2 -translate-x-1/2 rounded-sm bg-black/65 px-2 py-1 text-sm text-white';

  import { useLightboxContext } from '@/components/lightbox';

  const dialog = useLightboxContext();
</script>

<span class={statusClass}>Preview is {dialog().open ? 'open' : 'closed'}</span>