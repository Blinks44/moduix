<script lang="ts">
  import { Tooltip, TooltipArrow, TooltipBody, TooltipTrigger } from '@/components/tooltip';

  let { portalled = true }: { portalled?: boolean } = $props();
  let bodyRef: HTMLElement | null = $state(null);

  export const getBodyRef = () => bodyRef;
</script>

<Tooltip open {portalled}>
  <TooltipTrigger>Save</TooltipTrigger>
  <TooltipBody bind:ref={bodyRef}>
    {#if !portalled}<TooltipArrow />{/if}
    Save changes
  </TooltipBody>
</Tooltip>