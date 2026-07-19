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
        <TagsInput.Items />
        <TagsInput.Input placeholder="Add skill" />
        <TagsInput.ClearTrigger aria-label="Clear skills" />
      </TagsInput.Control>
    </TagsInput>
  );
}

//#endregion