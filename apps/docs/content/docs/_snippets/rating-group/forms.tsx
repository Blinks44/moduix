/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Button, RatingGroup } from '@moduix/react';

export function FormRatingGroupDemo() {
  return (
    <form
      className="rating-group-stack"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <RatingGroup name="review" defaultValue={4} required>
        <RatingGroup.Label>Review score</RatingGroup.Label>
        <RatingGroup.Control>
          <RatingGroup.Items />
        </RatingGroup.Control>
      </RatingGroup>
      <Button type="submit">Submit</Button>
    </form>
  );
}

//#endregion