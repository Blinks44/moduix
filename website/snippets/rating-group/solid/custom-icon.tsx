import {
  RatingGroup,
  RatingGroupControl,
  RatingGroupItemIndicator,
  RatingGroupItems,
  RatingGroupLabel,
} from '@moduix/solid/rating-group';
import { Heart as HeartIcon } from 'lucide-solid';
import styles from '@/components/examples/rating-group/component-custom-icon.module.css';

export default function CustomIconRatingGroupDemo() {
  return (
    <RatingGroup defaultValue={3}>
      <RatingGroupLabel>Checklist score</RatingGroupLabel>
      <RatingGroupControl>
        <RatingGroupItems>
          <RatingGroupItemIndicator class={styles.customIcon}>
            <HeartIcon />
          </RatingGroupItemIndicator>
        </RatingGroupItems>
      </RatingGroupControl>
    </RatingGroup>
  );
}
