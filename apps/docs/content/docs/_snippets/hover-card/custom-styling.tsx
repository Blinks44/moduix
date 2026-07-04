/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { HoverCard } from '@moduix/react';

const profiles = hoverCardProfiles;

export function CustomStylingHoverCard() {
  return (
    <HoverCard
      positioning={{
        placement: 'bottom-start',
        gutter: 10,
      }}
    >
      <HoverCard.Trigger className="custom-trigger" asChild>
        <a href="#profile">@sarah_chen</a>
      </HoverCard.Trigger>
      <HoverCard.Positioner>
        <HoverCard.Content className="custom-content">
          <HoverCard.Arrow />
          <ProfileCard profile={profiles[0]} />
        </HoverCard.Content>
      </HoverCard.Positioner>
    </HoverCard>
  );
}

//#endregion