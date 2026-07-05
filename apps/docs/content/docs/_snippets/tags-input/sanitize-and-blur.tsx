/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { TagsInput } from '@moduix/react';

export function SanitizeBlurTagsInput() {
  return (
    <TagsInput
      blurBehavior="add"
      sanitizeValue={(value) => value.trim().toLowerCase()}
      defaultValue={['design']}
    >
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
        <TagsInput.Input placeholder="Blur to add" />
        <TagsInput.ClearTrigger aria-label="Clear topics" />
      </TagsInput.Control>
      <TagsInput.HiddenInput />
    </TagsInput>
  );
}

//#endregion