<script lang="ts">
  import {
    HoverCard,
    HoverCardBody,
    HoverCardContent,
    HoverCardPositioner,
    HoverCardTrigger,
  } from '@/components/hover-card';
</script>

<HoverCard open portalled={false}>
  <HoverCardTrigger>Profile</HoverCardTrigger>
  <HoverCardPositioner>
    <HoverCardContent data-testid="content" style="max-height: 120px">
      <HoverCardBody>
        <div style="height: 400px">Long profile</div>
      </HoverCardBody>
    </HoverCardContent>
  </HoverCardPositioner>
</HoverCard>