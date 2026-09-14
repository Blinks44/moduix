import { RatingGroup } from '@moduix/react/rating-group';
import styles from '@/components/examples/rating-group/component-disabled-and-readonly.module.css';

export default function DisabledRatingGroupDemo() {
  return (
    <div className={styles.stack}>
      <RatingGroup defaultValue={4} disabled>
        <RatingGroup.Label>Disabled rating</RatingGroup.Label>
        <RatingGroup.Control>
          <RatingGroup.Items />
        </RatingGroup.Control>
      </RatingGroup>
      <RatingGroup defaultValue={2} readOnly>
        <RatingGroup.Label>Read-only rating</RatingGroup.Label>
        <RatingGroup.Control>
          <RatingGroup.Items />
        </RatingGroup.Control>
      </RatingGroup>
    </div>
  );
}