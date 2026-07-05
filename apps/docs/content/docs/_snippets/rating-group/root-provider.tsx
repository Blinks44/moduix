/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { useRatingGroup, RatingGroup as RatingGroupPrimitive } from '@ark-ui/react/rating-group';
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

export function RootProviderRatingGroupDemo() {
  const ratingGroup = useRatingGroup({
    count: 5,
    defaultValue: 3,
  });
  return (
    <div className="rating-group-stack">
      <output className="rating-group-hint">Current value: {ratingGroup.value}</output>
      <RatingGroup.RootProvider value={ratingGroup}>
        <RatingGroup.Label>Product quality</RatingGroup.Label>
        <RatingGroup.Control>
          <RatingGroupItems />
          <RatingGroup.HiddenInput />
        </RatingGroup.Control>
      </RatingGroup.RootProvider>
    </div>
  );
}

//#endregion