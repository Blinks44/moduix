<script lang="ts">
  import {
    HoverCard,
    HoverCardArrow,
    HoverCardArrowTip,
    HoverCardBody,
    HoverCardContent,
    HoverCardPositioner,
    HoverCardTrigger,
  } from '@/components/hover-card';

  const refs: Record<string, Element | null> = $state({
    trigger: null,
    positioner: null,
    content: null,
    arrow: null,
    arrowTip: null,
    body: null,
  });

  export const getRefs = () => refs;
</script>

<HoverCard open portalled={false}>
  <HoverCardTrigger bind:ref={refs.trigger} class="trigger-class">Profile</HoverCardTrigger>
  <HoverCardTrigger>
    {#snippet asChild(props)}<a {...props()} href="/profile">Composed profile</a>{/snippet}
  </HoverCardTrigger>
  <HoverCardPositioner bind:ref={refs.positioner} class="positioner-class">
    <HoverCardContent bind:ref={refs.content} class="content-class" data-testid="content">
      <HoverCardArrow bind:ref={refs.arrow} class="arrow-class">
        <HoverCardArrowTip bind:ref={refs.arrowTip} class="tip-class" />
      </HoverCardArrow>
      <HoverCardBody bind:ref={refs.body} class="body-class">Profile details</HoverCardBody>
    </HoverCardContent>
  </HoverCardPositioner>
</HoverCard>