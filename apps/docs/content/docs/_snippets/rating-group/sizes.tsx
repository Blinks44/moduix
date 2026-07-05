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

export function RatingGroupSizesDemo() {
  return (
    <div className="rating-group-stack">
      <RatingGroup size="xs" defaultValue={3} aria-label="Extra-small rating">
        <RatingGroup.Control>
          <RatingGroupItems />
        </RatingGroup.Control>
      </RatingGroup>
      <RatingGroup size="sm" defaultValue={3} aria-label="Small rating">
        <RatingGroup.Control>
          <RatingGroupItems />
        </RatingGroup.Control>
      </RatingGroup>
      <RatingGroup size="md" defaultValue={3} aria-label="Medium rating">
        <RatingGroup.Control>
          <RatingGroupItems />
        </RatingGroup.Control>
      </RatingGroup>
      <RatingGroup size="lg" defaultValue={3} aria-label="Large rating">
        <RatingGroup.Control>
          <RatingGroupItems />
        </RatingGroup.Control>
      </RatingGroup>
      <RatingGroup size="xl" defaultValue={3} aria-label="Extra-large rating">
        <RatingGroup.Control>
          <RatingGroupItems />
        </RatingGroup.Control>
      </RatingGroup>
    </div>
  );
}

//#endregion