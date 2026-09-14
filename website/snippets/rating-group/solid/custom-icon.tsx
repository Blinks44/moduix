import { RatingGroup } from '@moduix/solid/rating-group';
import { Heart as HeartIcon } from 'lucide-solid';
import styles from '@/components/examples/rating-group/component-custom-icon.module.css';

export default function CustomIconRatingGroupDemo() {
  return (
    <RatingGroup defaultValue={3}>
      <RatingGroup.Label>Checklist score</RatingGroup.Label>
      <RatingGroup.Control>
        <RatingGroup.Items>
          <RatingGroup.ItemIndicator class={styles.customIcon}>
            <HeartIcon />
          </RatingGroup.ItemIndicator>
        </RatingGroup.Items>
      </RatingGroup.Control>
    </RatingGroup>
  );
}