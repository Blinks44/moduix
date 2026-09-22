import {
  RatingGroup,
  RatingGroupControl,
  RatingGroupItemIndicator,
  RatingGroupItems,
  RatingGroupLabel,
} from '@moduix/react/rating-group';
import { Heart as HeartIcon } from 'lucide-react';
import styles from '@/components/examples/rating-group/component-custom-icon.module.css';

export default function CustomIconRatingGroupDemo() {
  return (
    <RatingGroup defaultValue={3}>
      <RatingGroupLabel>Checklist score</RatingGroupLabel>
      <RatingGroupControl>
        <RatingGroupItems>
          <RatingGroupItemIndicator className={styles.customIcon}>
            <HeartIcon />
          </RatingGroupItemIndicator>
        </RatingGroupItems>
      </RatingGroupControl>
    </RatingGroup>
  );
}
