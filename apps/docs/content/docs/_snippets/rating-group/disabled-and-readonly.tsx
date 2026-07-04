/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { RatingGroup as RatingGroupPrimitive } from '@ark-ui/react/rating-group';
import { RatingGroup } from '@moduix/react';

function RatingGroupItems() {
  return (
    <RatingGroupPrimitive.Context>
      {({ items }) =>
        items.map((item) => (
          <RatingGroup.Item key={item} index={item}>
            <RatingGroup.ItemIndicator />
          </RatingGroup.Item>
        ))
      }
    </RatingGroupPrimitive.Context>
  );
}

export function DisabledRatingGroupDemo() {
  return (
    <div className="rating-group-stack">
      <RatingGroup defaultValue={4} disabled>
        <RatingGroup.Label>Disabled rating</RatingGroup.Label>
        <RatingGroup.Control>
          <RatingGroupItems />
          <RatingGroup.HiddenInput />
        </RatingGroup.Control>
      </RatingGroup>
      <RatingGroup defaultValue={2} readOnly>
        <RatingGroup.Label>Read-only rating</RatingGroup.Label>
        <RatingGroup.Control>
          <RatingGroupItems />
          <RatingGroup.HiddenInput />
        </RatingGroup.Control>
      </RatingGroup>
    </div>
  );
}

//#endregion