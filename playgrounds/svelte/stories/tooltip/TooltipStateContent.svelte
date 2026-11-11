<script lang="ts">
  import { TooltipContent, useTooltipContext } from '@/components/tooltip';

  const tooltip = useTooltipContext();
</script>

<TooltipContent>Open from context: {tooltip().open}</TooltipContent>