<script lang="ts">
  import { ChartPlot, type ChartPlotProps } from '@/components/chart';

  let props: Omit<ChartPlotProps, 'definition'> = $props();
</script>

<ChartPlot {...props} definition={{} as never} />