import {
  RatingGroup,
  RatingGroupControl,
  RatingGroupItems,
  RatingGroupLabel,
} from '@moduix/react/rating-group';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/rating-group/component-controlled.module.css';

export default function ControlledRatingGroupDemo() {
  const [value, setValue] = useState(3);
  return (
    <div className={styles.stack}>
      <RatingGroup value={value} onValueChange={(details) => setValue(details.value)}>
        <RatingGroupLabel>Support quality</RatingGroupLabel>
        <RatingGroupControl>
          <RatingGroupItems />
        </RatingGroupControl>
      </RatingGroup>
      <PreviewMeta>
        <output className={styles.hint}>Current value: {value}</output>
      </PreviewMeta>
    </div>
  );
}