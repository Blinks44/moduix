import { Button } from '@moduix/react/button';
import {
  RatingGroup,
  RatingGroupControl,
  RatingGroupHiddenInput,
  RatingGroupItems,
  RatingGroupLabel,
} from '@moduix/react/rating-group';
import { useState } from 'react';
import styles from '@/components/examples/rating-group/component-forms.module.css';

export default function FormRatingGroupDemo() {
  const [submitted, setSubmitted] = useState('Nothing submitted');

  return (
    <form
      className={styles.stack}
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(String(new FormData(event.currentTarget).get('review') ?? ''));
      }}
    >
      <RatingGroup name="review" defaultValue={4} required>
        <RatingGroupLabel>Review score</RatingGroupLabel>
        <RatingGroupControl>
          <RatingGroupItems />
        </RatingGroupControl>
        <RatingGroupHiddenInput />
      </RatingGroup>
      <div data-preview-meta>
        <Button type="submit">Submit</Button>
        <output className={styles.hint}>Submitted: {submitted}</output>
      </div>
    </form>
  );
}