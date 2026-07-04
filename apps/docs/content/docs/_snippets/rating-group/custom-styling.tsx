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

export function CustomRatingGroupDemo() {
  return (
    <RatingGroup className="rating-group-custom" defaultValue={5}>
      <RatingGroup.Label>Styled rating</RatingGroup.Label>
      <RatingGroup.Control>
        <RatingGroupItems />
        <RatingGroup.HiddenInput />
      </RatingGroup.Control>
    </RatingGroup>
  );
}

//#endregion