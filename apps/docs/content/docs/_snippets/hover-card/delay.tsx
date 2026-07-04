/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { HoverCard } from '@moduix/react';

export function DelayHoverCard() {
  return (
    <HoverCard openDelay={200} closeDelay={500}>
      <HoverCard.Trigger asChild>
        <a href="#profile">@sarah_chen</a>
      </HoverCard.Trigger>
      <HoverCard.Positioner>
        <HoverCard.Content>
          <HoverCard.Arrow />
          <ProfileCard profile={profiles[0]} />
        </HoverCard.Content>
      </HoverCard.Positioner>
    </HoverCard>
  );
}

//#endregion