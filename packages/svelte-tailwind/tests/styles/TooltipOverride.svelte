<script lang="ts">
  import {
    Tooltip,
    TooltipArrow,
    TooltipArrowTip,
    TooltipContent,
    TooltipPositioner,
    TooltipTrigger,
  } from '@/components/tooltip';
</script>

<Tooltip open portalled={false}>
  <TooltipTrigger class="px-2 text-primary">Save</TooltipTrigger>
  <TooltipPositioner class="max-w-none">
    <TooltipContent data-testid="content" class="bg-card px-6 text-left">
      <TooltipArrow><TooltipArrowTip class="border-primary" /></TooltipArrow>
      Save changes
    </TooltipContent>
  </TooltipPositioner>
</Tooltip>