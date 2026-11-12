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
import { Stack } from '@moduix/react/stack';
import styles from '@/components/examples/rating-group/component-root-provider.module.css';

export default function RootProviderRatingGroupDemo() {
  const ratingGroup = useRatingGroup({
    count: 5,
    defaultValue: 3,
  });

  return (
    <Stack align="center" gap="3">
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
      <div data-preview-meta>
        <output className={styles.hint}>Current value: {ratingGroup.value}</output>
        <Button type="button" size="sm" onClick={() => ratingGroup.setValue(5)}>
          Set to 5
        </Button>
      </div>
    </Stack>
  );
}