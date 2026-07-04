/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { RatingGroup as RatingGroupPrimitive } from '@ark-ui/react/rating-group';
import { Button, RatingGroup } from '@moduix/react';

function RatingGroupItems() {
  return (
    <RatingGroupPrimitive.Context>
      {({ items }) =>
        items.map((item) => (
          <RatingGroup.Item key={item} index={item}>
            <RatingGroup.ItemIndicator />
          </RatingGroup.Item>
        ))
      }
    </RatingGroupPrimitive.Context>
  );
}

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
          <RatingGroupItems />
          <RatingGroup.HiddenInput />
        </RatingGroup.Control>
      </RatingGroup>
      <Button type="submit">Submit</Button>
    </form>
  );
}

//#endregion