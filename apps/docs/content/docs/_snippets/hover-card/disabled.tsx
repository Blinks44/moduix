/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { HoverCard } from '@moduix/react';

export function DisabledHoverCard() {
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

//#endregion