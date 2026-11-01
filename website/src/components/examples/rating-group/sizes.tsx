import { RatingGroup, RatingGroupControl, RatingGroupItems } from '@moduix/react/rating-group';
import { Stack } from '@moduix/react/stack';

export default function RatingGroupSizesDemo() {
  return (
    <Stack align="center" gap="3">
      <RatingGroup size="xs" defaultValue={3} aria-label="Extra-small rating">
        <RatingGroupControl>
          <RatingGroupItems />
        </RatingGroupControl>
      </RatingGroup>
      <RatingGroup size="sm" defaultValue={3} aria-label="Small rating">
        <RatingGroupControl>
          <RatingGroupItems />
        </RatingGroupControl>
      </RatingGroup>
      <RatingGroup size="md" defaultValue={3} aria-label="Medium rating">
        <RatingGroupControl>
          <RatingGroupItems />
        </RatingGroupControl>
      </RatingGroup>
      <RatingGroup size="lg" defaultValue={3} aria-label="Large rating">
        <RatingGroupControl>
          <RatingGroupItems />
        </RatingGroupControl>
      </RatingGroup>
      <RatingGroup size="xl" defaultValue={3} aria-label="Extra-large rating">
        <RatingGroupControl>
          <RatingGroupItems />
        </RatingGroupControl>
      </RatingGroup>
    </Stack>
  );
}