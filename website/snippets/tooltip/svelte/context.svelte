<script lang="ts">
  import { Tooltip, TooltipPositioner, TooltipTrigger } from '@moduix/svelte/tooltip';
  import TooltipStateContent from './TooltipStateContent.svelte';
</script>

<Tooltip>
  <TooltipTrigger>Context tooltip</TooltipTrigger>
  <TooltipPositioner><TooltipStateContent /></TooltipPositioner>
</Tooltip>