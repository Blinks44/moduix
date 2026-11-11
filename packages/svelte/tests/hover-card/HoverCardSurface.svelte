<script lang="ts">
  import {
    HoverCardArrow,
    HoverCardBody,
    HoverCardContent,
    HoverCardPositioner,
  } from '@/components/hover-card';
</script>

<HoverCardPositioner>
  <HoverCardContent data-testid="content">
    <HoverCardArrow />
    <HoverCardBody>Profile details</HoverCardBody>
  </HoverCardContent>
</HoverCardPositioner>