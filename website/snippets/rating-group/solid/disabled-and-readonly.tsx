import {
  RatingGroup,
  RatingGroupControl,
  RatingGroupItems,
  RatingGroupLabel,
} from '@moduix/solid/rating-group';
import { Stack } from '@moduix/solid/stack';

export default function DisabledRatingGroupDemo() {
  return (
    <Stack align="center" gap="3">
      <RatingGroup defaultValue={4} disabled>
        <RatingGroupLabel>Disabled rating</RatingGroupLabel>
        <RatingGroupControl>
          <RatingGroupItems />
        </RatingGroupControl>
      </RatingGroup>
      <RatingGroup defaultValue={2} readOnly>
        <RatingGroupLabel>Read-only rating</RatingGroupLabel>
        <RatingGroupControl>
          <RatingGroupItems />
        </RatingGroupControl>
      </RatingGroup>
    </Stack>
  );
}