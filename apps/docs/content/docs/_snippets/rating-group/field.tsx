/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Field, RatingGroup } from '@moduix/react';

export function FieldRatingGroupDemo() {
  return (
    <Field className="rating-group-field">
      <RatingGroup defaultValue={4} required>
        <RatingGroup.Label>Experience score</RatingGroup.Label>
        <RatingGroup.Control>
          <RatingGroup.Items />
        </RatingGroup.Control>
      </RatingGroup>
      <Field.HelperText>Required score from 1 to 5.</Field.HelperText>
      <Field.ErrorText>Choose a score before continuing.</Field.ErrorText>
    </Field>
  );
}

//#endregion