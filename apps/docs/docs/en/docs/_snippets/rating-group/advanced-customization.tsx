import { Button, RatingGroup, useRatingGroup } from '@moduix/react';
import { PreviewMeta } from '@/components/mdx/Components';

export default function AdvancedCustomizationRatingGroupDemo() {
  const ratingGroup = useRatingGroup({
    count: 5,
    defaultValue: 3,
  });

  return (
    <div className="rating-group-stack">
      <RatingGroup.RootProvider value={ratingGroup}>
        <RatingGroup.Label>Product quality</RatingGroup.Label>
        <RatingGroup.Control>
          <RatingGroup.Context>
            {({ items }) =>
              items.map((item) => (
                <RatingGroup.Item key={item} index={item}>
                  <RatingGroup.ItemIndicator />
                </RatingGroup.Item>
              ))
            }
          </RatingGroup.Context>
        </RatingGroup.Control>
      </RatingGroup.RootProvider>
      <PreviewMeta>
        <output className="rating-group-hint">Current value: {ratingGroup.value}</output>
        <Button type="button" size="sm" onClick={() => ratingGroup.setValue(5)}>
          Set to 5
        </Button>
      </PreviewMeta>
    </div>
  );
}