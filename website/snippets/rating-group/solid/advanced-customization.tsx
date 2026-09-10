import { Button } from '@moduix/solid/button';
import { RatingGroup, useRatingGroup } from '@moduix/solid/rating-group';
import { For } from 'solid-js';
import styles from '@/components/examples/rating-group/component-advanced-customization.module.css';

export default function AdvancedCustomizationRatingGroupDemo() {
  const ratingGroup = useRatingGroup({
    count: 5,
    defaultValue: 3,
  });

  return (
    <div class={styles.stack}>
      <RatingGroup.RootProvider value={ratingGroup}>
        <RatingGroup.Label>Product quality</RatingGroup.Label>
        <RatingGroup.Control>
          <RatingGroup.Context>
            {(ratingGroup) => (
              <For each={ratingGroup().items}>
                {(item) => (
                  <RatingGroup.Item index={item}>
                    <RatingGroup.ItemIndicator />
                  </RatingGroup.Item>
                )}
              </For>
            )}
          </RatingGroup.Context>
        </RatingGroup.Control>
      </RatingGroup.RootProvider>
      <output>Current value: {ratingGroup().value}</output>
      <Button type="button" size="sm" onClick={() => ratingGroup().setValue(5)}>
        Set to 5
      </Button>
    </div>
  );
}