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
          <TagsInput.Context>
            {(tagsInput) =>
              tagsInput.value.map((item, index) => (
                <TagsInput.Item key={`${item}-${index}`} index={index} value={item}>
                  <TagsInput.ItemPreview>
                    <TagsInput.ItemText>{item}</TagsInput.ItemText>
                    <TagsInput.ItemDeleteTrigger aria-label={`Remove ${item}`} />
                  </TagsInput.ItemPreview>
                  <TagsInput.ItemInput />
                </TagsInput.Item>
              ))
            }
          </TagsInput.Context>
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