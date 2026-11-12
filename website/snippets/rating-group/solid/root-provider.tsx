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
import { Stack } from '@moduix/solid/stack';
import { For } from 'solid-js';

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
      <div data-preview-meta>
        <output>Current value: {ratingGroup().value}</output>
        <Button type="button" size="sm" onClick={() => ratingGroup().setValue(5)}>
          Set to 5
        </Button>
      </div>
    </Stack>
  );
}