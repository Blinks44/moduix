<script lang="ts">
  import {
    Tooltip,
    TooltipArrow,
    TooltipArrowTip,
    TooltipBody,
    TooltipContent,
    TooltipPositioner,
    TooltipTrigger,
  } from '@/components/tooltip';

  let { calls }: { calls: string[] } = $props();
  let arrowTipRef: Element | null = $state(null);
  let bodyRef: Element | null = $state(null);

  export const getRefs = () => ({ arrowTipRef, bodyRef });
</script>

<Tooltip open portalled={false}>
  <TooltipTrigger class="consumer-trigger" onclick={() => calls.push('trigger')}>
    {#snippet asChild(props)}
      <a {...props()} href="#save" data-testid="custom-trigger">Save</a>
    {/snippet}
  </TooltipTrigger>
  <TooltipPositioner data-testid="custom-positioner">
    {#snippet asChild(positionerProps)}
      <section {...positionerProps()}>
        <TooltipContent class="consumer-content" style="color: red">
          {#snippet asChild(contentProps)}
            <article {...contentProps()} data-testid="custom-content">
              <TooltipArrow>
                {#snippet asChild(arrowProps)}
                  <aside {...arrowProps()} data-testid="custom-arrow">
                    <TooltipArrowTip bind:ref={arrowTipRef} class="consumer-tip">
                      {#snippet asChild(tipProps)}
                        <span {...tipProps()} data-testid="custom-tip">Custom tip</span>
                      {/snippet}
                    </TooltipArrowTip>
                  </aside>
                {/snippet}
              </TooltipArrow>
              Save changes
            </article>
          {/snippet}
        </TooltipContent>
      </section>
    {/snippet}
  </TooltipPositioner>
</Tooltip>
<Tooltip open portalled={false}>
  <TooltipTrigger>Body hint</TooltipTrigger>
  <TooltipBody bind:ref={bodyRef} data-testid="custom-body">
    {#snippet asChild(props)}<p {...props()}>Body host</p>{/snippet}
  </TooltipBody>
</Tooltip>