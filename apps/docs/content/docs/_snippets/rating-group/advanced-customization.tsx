/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { RatingGroup, useRatingGroup } from '@moduix/react';

export function AdvancedCustomizationRatingGroupDemo() {
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
          <RatingGroup.Items />
        </RatingGroup.Control>
      </RatingGroup.RootProvider>
    </div>
  );
}

//#endregion