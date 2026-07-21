/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Button, RatingGroup } from '@moduix/react';
import { useState } from 'react';

export function FormRatingGroupDemo() {
  const [submitted, setSubmitted] = useState('Nothing submitted');

  return (
    <form
      className="rating-group-stack"
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
      </RatingGroup>
      <Button type="submit">Submit</Button>
      <output className="rating-group-hint">Submitted: {submitted}</output>
    </form>
  );
}

//#endregion