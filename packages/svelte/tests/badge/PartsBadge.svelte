<script lang="ts">
  import { Badge, BadgeDot, BadgeLabel } from '@/components/badge';

  let rootRef: Element | null = $state(null);
  let dotRef: Element | null = $state(null);
  let labelRef: Element | null = $state(null);

  export const getRefs = () => ({ rootRef, dotRef, labelRef });
</script>

<Badge bind:ref={rootRef}>
  <BadgeDot bind:ref={dotRef} />
  <BadgeLabel bind:ref={labelRef}>Production ready</BadgeLabel>
</Badge>