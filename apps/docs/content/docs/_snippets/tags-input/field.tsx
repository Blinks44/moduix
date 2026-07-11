/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Field, TagsInput } from '@moduix/react';

const invalid = true;

export function FieldTagsInput() {
  return (
    <Field invalid required>
      <TagsInput defaultValue={['api']} name="topics">
        <TagsInput.Label>Topics</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Items />
          <TagsInput.Input placeholder="Add topic" />
          <TagsInput.ClearTrigger aria-label="Clear topics" />
        </TagsInput.Control>
        <TagsInput.HiddenInput />
      </TagsInput>
      <Field.HelperText>Add at least one topic.</Field.HelperText>
      <Field.ErrorText>Topics are required.</Field.ErrorText>
    </Field>
  );
}

//#endregion