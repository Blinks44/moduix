/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { HoverCard } from '@moduix/react';
import { useState } from 'react';

export function ControlledHoverCard() {
  const [open, setOpen] = useState(false);
  return (
    <HoverCard open={open} onOpenChange={(details) => setOpen(details.open)}>
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