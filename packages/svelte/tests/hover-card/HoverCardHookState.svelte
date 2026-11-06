<script lang="ts">
  import { useHoverCardContext } from '@/components/hover-card';

  const hoverCard = useHoverCardContext();
</script>

<output>Hook: {hoverCard().open ? 'open' : 'closed'}</output>