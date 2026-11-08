<script lang="ts">
  import { TocRail } from '@/components/toc';

  let depth = $state(3);
  let railRef: SVGSVGElement | null = $state(null);

  export const setDepth = (value: number) => (depth = value);
  export const getRail = () => railRef as SVGSVGElement;
</script>

<TocRail bind:ref={railRef} {depth} previousDepth={2} nextDepth={2} />