import { Button } from '@moduix/react/button';
import { RatingGroup } from '@moduix/react/rating-group';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
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
        <RatingGroup.Label>Review score</RatingGroup.Label>
        <RatingGroup.Control>
          <RatingGroup.Items />
        </RatingGroup.Control>
        <RatingGroup.HiddenInput />
      </RatingGroup>
      <PreviewMeta>
        <Button type="submit">Submit</Button>
        <output className={styles.hint}>Submitted: {submitted}</output>
      </PreviewMeta>
    </form>
  );
}