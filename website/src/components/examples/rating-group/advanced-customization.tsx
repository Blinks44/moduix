import { Button } from '@moduix/react/button';
import {
  RatingGroupContext,
  RatingGroupControl,
  RatingGroupItem,
  RatingGroupItemIndicator,
  RatingGroupLabel,
  RatingGroupRootProvider,
  useRatingGroup,
} from '@moduix/react/rating-group';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/rating-group/component-advanced-customization.module.css';

export default function AdvancedCustomizationRatingGroupDemo() {
  const ratingGroup = useRatingGroup({
    count: 5,
    defaultValue: 3,
  });

  return (
    <div className={styles.stack}>
      <RatingGroupRootProvider value={ratingGroup}>
        <RatingGroupLabel>Product quality</RatingGroupLabel>
        <RatingGroupControl>
          <RatingGroupContext>
            {({ items }) =>
              items.map((item) => (
                <RatingGroupItem key={item} index={item}>
                  <RatingGroupItemIndicator />
                </RatingGroupItem>
              ))
            }
          </RatingGroupContext>
        </RatingGroupControl>
      </RatingGroupRootProvider>
      <PreviewMeta>
        <output className={styles.hint}>Current value: {ratingGroup.value}</output>
        <Button type="button" size="sm" onClick={() => ratingGroup.setValue(5)}>
          Set to 5
        </Button>
      </PreviewMeta>
    </div>
  );
}