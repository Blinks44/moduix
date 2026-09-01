import { RatingGroup } from '@moduix/react/rating-group';
import { Heart as HeartIcon } from 'lucide-react';
import styles from '@/components/examples/rating-group/component-custom-icon.module.css';

export default function CustomIconRatingGroupDemo() {
  return (
    <RatingGroup defaultValue={3}>
      <RatingGroup.Label>Checklist score</RatingGroup.Label>
      <RatingGroup.Control>
        <RatingGroup.Items>
          <RatingGroup.ItemIndicator className={styles.customIcon}>
            <HeartIcon />
          </RatingGroup.ItemIndicator>
        </RatingGroup.Items>
      </RatingGroup.Control>
    </RatingGroup>
  );
}