/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { TagsInput } from '@moduix/react';

export function AdvancedCustomizationTagsInput() {
  return (
    <TagsInput defaultValue={['React', 'TypeScript']} name="frameworks">
      <TagsInput.Label>Frameworks</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Context>
          {(tagsInput) =>
            tagsInput.value.map((value, index) => (
              <TagsInput.Item key={`${value}-${index}`} index={index} value={value}>
                <TagsInput.ItemPreview>
                  <TagsInput.ItemText>{value}</TagsInput.ItemText>
                  <TagsInput.ItemDeleteTrigger aria-label={`Remove ${value}`} />
                </TagsInput.ItemPreview>
                <TagsInput.ItemInput />
              </TagsInput.Item>
            ))
          }
        </TagsInput.Context>
        <TagsInput.Input placeholder="Add framework" />
        <TagsInput.ClearTrigger aria-label="Clear frameworks" />
      </TagsInput.Control>
      <TagsInput.HiddenInput />
    </TagsInput>
  );
}

//#endregion