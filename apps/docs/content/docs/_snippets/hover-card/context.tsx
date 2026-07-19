/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { HoverCard } from '@moduix/react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

export function ContextHoverCard() {
  return (
    <HoverCard>
      <HoverCard.Context>
        {(context) => (
          <HoverCard.Trigger asChild>
            <a href="#profile">
              @sarah_chen {context.open ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </a>
          </HoverCard.Trigger>
        )}
      </HoverCard.Context>
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