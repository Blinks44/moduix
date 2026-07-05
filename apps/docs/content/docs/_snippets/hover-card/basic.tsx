/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { HoverCard } from '@moduix/react';

const profiles = hoverCardProfiles;

export function HoverCardDemo() {
  return (
    <HoverCard>
      <p>
        Liked by{' '}
        <HoverCard.Trigger asChild>
          <a href="#profile">@sarah_chen</a>
        </HoverCard.Trigger>{' '}
        and 3 others
      </p>
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