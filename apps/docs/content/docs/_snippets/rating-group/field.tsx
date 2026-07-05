/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { RatingGroup as RatingGroupPrimitive } from '@ark-ui/react/rating-group';
import { Field, RatingGroup } from '@moduix/react';

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

export function FieldRatingGroupDemo() {
  return (
    <Field className="rating-group-field">
      <RatingGroup defaultValue={4} required>
        <RatingGroup.Label>Experience score</RatingGroup.Label>
        <RatingGroup.Control>
          <RatingGroupItems />
          <RatingGroup.HiddenInput />
        </RatingGroup.Control>
      </RatingGroup>
      <Field.HelperText>Required score from 1 to 5.</Field.HelperText>
      <Field.ErrorText>Choose a score before continuing.</Field.ErrorText>
    </Field>
  );
}

//#endregion