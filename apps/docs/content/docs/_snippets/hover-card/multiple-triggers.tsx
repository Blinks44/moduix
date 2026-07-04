/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { HoverCard } from '@moduix/react';
import { useState } from 'react';

const profiles = hoverCardProfiles;

export function MultipleTriggersHoverCard() {
  const [activeProfile, setActiveProfile] = useState(profiles[0]);
  return (
    <HoverCard
      onTriggerValueChange={(details) => {
        setActiveProfile(profiles.find((profile) => profile.id === details.value) ?? null);
      }}
    >
      {profiles.map((profile) => (
        <HoverCard.Trigger key={profile.id} value={profile.id} asChild>
          <a href={'#' + profile.id}>{profile.username}</a>
        </HoverCard.Trigger>
      ))}
      <HoverCard.Positioner>
        <HoverCard.Content>
          <HoverCard.Arrow />
          {activeProfile ? <ProfileCard profile={activeProfile} /> : null}
        </HoverCard.Content>
      </HoverCard.Positioner>
    </HoverCard>
  );
}

//#endregion