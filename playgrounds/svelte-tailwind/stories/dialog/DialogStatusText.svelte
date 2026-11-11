<script lang="ts">
  import { useDialogContext } from '@/components/dialog';

  const dialog = useDialogContext();
</script>

<span>Dialog is {dialog().open ? 'open' : 'closed'}</span>