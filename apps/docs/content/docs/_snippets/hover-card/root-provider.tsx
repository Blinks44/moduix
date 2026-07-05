/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { useHoverCard } from '@ark-ui/react/hover-card';
import { HoverCard } from '@moduix/react';

export function RootProviderHoverCard() {
  const hoverCard = useHoverCard();
  return (
    <HoverCard.RootProvider value={hoverCard}>
      <HoverCard.Trigger asChild>
        <a href="#profile">@sarah_chen</a>
      </HoverCard.Trigger>
      <HoverCard.Positioner>
        <HoverCard.Content>
          <HoverCard.Arrow />
          <ProfileCard profile={profiles[0]} />
        </HoverCard.Content>
      </HoverCard.Positioner>
    </HoverCard.RootProvider>
  );
}

//#endregion