import {
  RatingGroup,
  RatingGroupControl,
  RatingGroupItems,
  RatingGroupLabel,
} from '@moduix/solid/rating-group';
import styles from '@/components/examples/rating-group/component-disabled-and-readonly.module.css';

export default function DisabledRatingGroupDemo() {
  return (
    <div class={styles.stack}>
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
    </div>
  );
}