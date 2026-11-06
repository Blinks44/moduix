<script lang="ts">
  import {
    HoverCard,
    HoverCardArrow,
    HoverCardBody,
    HoverCardContent,
    HoverCardPositioner,
    HoverCardTrigger,
  } from '@/components/hover-card';
</script>

<HoverCard open portalled={false}>
  <HoverCardTrigger>Profile</HoverCardTrigger>
  <HoverCardPositioner>
    <HoverCardContent>
      <HoverCardArrow />
      <HoverCardBody>Profile details</HoverCardBody>
    </HoverCardContent>
  </HoverCardPositioner>
</HoverCard>