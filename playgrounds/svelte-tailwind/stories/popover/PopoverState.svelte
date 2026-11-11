<script lang="ts">
  import { usePopoverContext } from '@/components/popover';

  const popover = usePopoverContext();
</script>

<output>Popover is {popover().open ? 'open' : 'closed'}</output>