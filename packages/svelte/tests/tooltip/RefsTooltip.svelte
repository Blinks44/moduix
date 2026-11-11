<script lang="ts">
  import { Button } from '@/components/button';
  import {
    Tooltip,
    TooltipArrow,
    TooltipArrowTip,
    TooltipContent,
    TooltipDisabledTrigger,
    TooltipPositioner,
    TooltipTrigger,
  } from '@/components/tooltip';

  const refs: Record<string, Element | null> = $state({
    trigger: null,
    disabledTrigger: null,
    positioner: null,
    content: null,
    arrow: null,
    arrowTip: null,
  });

  export const getRefs = () => refs;
</script>

<Tooltip open portalled={false}>
  <TooltipTrigger bind:ref={refs.trigger}>Save</TooltipTrigger>
  <TooltipTrigger aria-label="Composed save">
    {#snippet asChild(props)}<a {...props()} href="#save">Composed save</a>{/snippet}
  </TooltipTrigger>
  <TooltipDisabledTrigger bind:ref={refs.disabledTrigger} aria-label="Disabled save">
    <Button disabled>Disabled save</Button>
  </TooltipDisabledTrigger>
  <TooltipPositioner bind:ref={refs.positioner}>
    <TooltipContent bind:ref={refs.content}>
      <TooltipArrow bind:ref={refs.arrow}><TooltipArrowTip bind:ref={refs.arrowTip} /></TooltipArrow
      >
      Explicit content
    </TooltipContent>
  </TooltipPositioner>
</Tooltip>