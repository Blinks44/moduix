<script lang="ts">
  import { usePopoverContext } from '@/components/popover';

  const popover = usePopoverContext();
</script>

<output>Hook: {popover().open ? 'open' : 'closed'}</output>