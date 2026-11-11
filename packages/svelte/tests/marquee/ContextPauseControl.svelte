<script lang="ts">
  import { useMarqueeContext } from '@/components/marquee';

  const marquee = useMarqueeContext();
</script>

<button type="button" onclick={() => marquee().pause()}>Pause marquee</button>