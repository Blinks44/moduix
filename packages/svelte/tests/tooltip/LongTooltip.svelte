<script lang="ts">
  import { Tooltip, TooltipBody, TooltipTrigger } from '@/components/tooltip';

  const text = 'Long tooltip text '.repeat(200);
</script>

<Tooltip open portalled={false}>
  <TooltipTrigger>Save</TooltipTrigger>
  <TooltipBody>{text}</TooltipBody>
</Tooltip>