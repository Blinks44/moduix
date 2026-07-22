import { RatingGroup, useRatingGroup } from '@moduix/react';

export default function AdvancedCustomizationRatingGroupDemo() {
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