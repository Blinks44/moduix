/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { RatingGroup as RatingGroupPrimitive } from '@ark-ui/react/rating-group';
import { RatingGroup } from '@moduix/react';
import { Heart as HeartIcon } from 'lucide-react';

function RatingGroupHeartItems() {
  return (
    <RatingGroupPrimitive.Context>
      {({ items }) =>
        items.map((item) => (
          <RatingGroup.Item key={item} index={item}>
            <RatingGroup.ItemIndicator className="rating-group-custom-icon">
              <HeartIcon />
            </RatingGroup.ItemIndicator>
          </RatingGroup.Item>
        ))
      }
    </RatingGroupPrimitive.Context>
  );
}

export function CustomIconRatingGroupDemo() {
  return (
    <RatingGroup defaultValue={3}>
      <RatingGroup.Label>Checklist score</RatingGroup.Label>
      <RatingGroup.Control>
        <RatingGroupHeartItems />
        <RatingGroup.HiddenInput />
      </RatingGroup.Control>
    </RatingGroup>
  );
}

//#endregion