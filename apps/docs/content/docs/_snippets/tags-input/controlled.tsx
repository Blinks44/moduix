/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { TagsInput } from '@moduix/react';
import { useState } from 'react';

export function ControlledTagsInput() {
  const [value, setValue] = useState(['React', 'TypeScript']);
  function handleValueChange(details) {
    setValue(details.value);
  }
  return (
    <TagsInput value={value} onValueChange={handleValueChange}>
      <TagsInput.Label>Skills</TagsInput.Label>
      <TagsInput.Control>
        {value.map((item, index) => (
          <TagsInput.Item key={`${item}-${index}`} index={index} value={item}>
            <TagsInput.ItemPreview>
              <TagsInput.ItemText>{item}</TagsInput.ItemText>
              <TagsInput.ItemDeleteTrigger aria-label={`Remove ${item}`} />
            </TagsInput.ItemPreview>
            <TagsInput.ItemInput />
          </TagsInput.Item>
        ))}
        <TagsInput.Input placeholder="Add skill" />
        <TagsInput.ClearTrigger aria-label="Clear skills" />
      </TagsInput.Control>
      <TagsInput.HiddenInput />
    </TagsInput>
  );
}

//#endregion