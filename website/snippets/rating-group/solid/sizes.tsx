import {
  RatingGroup,
  RatingGroupControl,
  RatingGroupItems,
} from '@moduix/solid/rating-group';
import styles from '@/components/examples/rating-group/component-sizes.module.css';

export default function RatingGroupSizesDemo() {
  return (
    <div class={styles.stack}>
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
    </div>
  );
}
