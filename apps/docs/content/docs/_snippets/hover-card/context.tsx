/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { HoverCard as HoverCardPrimitive } from '@ark-ui/react/hover-card';
import { HoverCard } from '@moduix/react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

export function ContextHoverCard() {
  return (
    <HoverCard>
      <HoverCardPrimitive.Context>
        {(context) => (
          <HoverCard.Trigger asChild>
            <a href="#profile">
              @sarah_chen {context.open ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </a>
          </HoverCard.Trigger>
        )}
      </HoverCardPrimitive.Context>
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