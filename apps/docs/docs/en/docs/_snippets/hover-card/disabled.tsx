import { HoverCard } from '@moduix/react';

export default function DisabledHoverCard() {
  return (
    <HoverCard disabled>
      <HoverCard.Trigger asChild>
        <a href="#profile">@sarah_chen</a>
      </HoverCard.Trigger>
      <HoverCard.Positioner>
        <HoverCard.Content>
          <HoverCard.Arrow />
          Profile details
        </HoverCard.Content>
      </HoverCard.Positioner>
    </HoverCard>
  );
}