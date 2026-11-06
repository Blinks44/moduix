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
</script>

<HoverCard open portalled={false}>
  <HoverCardTrigger class="gap-2 text-destructive">Profile</HoverCardTrigger>
  <HoverCardPositioner class="max-w-none">
    <HoverCardContent data-testid="content" class="bg-card p-4">
      <HoverCardArrow class="[--arrow-size:1rem]">
        <HoverCardArrowTip class="border-primary" />
      </HoverCardArrow>
      <HoverCardBody class="overflow-hidden">Profile details</HoverCardBody>
    </HoverCardContent>
  </HoverCardPositioner>
</HoverCard>