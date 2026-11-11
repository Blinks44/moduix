<script lang="ts">
  import { ChartPlot } from '@/components/chart';
</script>

<ChartPlot
  ariaLabel="Monthly revenue"
  definition={{ tooltip: { use: {}, className: '!bg-muted' } } as never}
/>