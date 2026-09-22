import { Button } from '@moduix/solid/button';
import {
  RatingGroupContext,
  RatingGroupControl,
  RatingGroupItem,
  RatingGroupItemIndicator,
  RatingGroupLabel,
  RatingGroupRootProvider,
  useRatingGroup,
} from '@moduix/solid/rating-group';
import { For } from 'solid-js';
import styles from '@/components/examples/rating-group/component-advanced-customization.module.css';

export default function AdvancedCustomizationRatingGroupDemo() {
  const ratingGroup = useRatingGroup({
    count: 5,
    defaultValue: 3,
  });

  return (
    <div class={styles.stack}>
      <RatingGroupRootProvider value={ratingGroup}>
        <RatingGroupLabel>Product quality</RatingGroupLabel>
        <RatingGroupControl>
          <RatingGroupContext>
            {(ratingGroup) => (
              <For each={ratingGroup().items}>
                {(item) => (
                  <RatingGroupItem index={item}>
                    <RatingGroupItemIndicator />
                  </RatingGroupItem>
                )}
              </For>
            )}
          </RatingGroupContext>
        </RatingGroupControl>
      </RatingGroupRootProvider>
      <output>Current value: {ratingGroup().value}</output>
      <Button type="button" size="sm" onClick={() => ratingGroup().setValue(5)}>
        Set to 5
      </Button>
    </div>
  );
}
