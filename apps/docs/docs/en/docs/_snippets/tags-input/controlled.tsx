import { TagsInput } from '@moduix/react';
import { useState } from 'react';

export default function ControlledTagsInput() {
  const [value, setValue] = useState(['React', 'TypeScript']);
  return (
    <TagsInput value={value} onValueChange={(details) => setValue(details.value)}>
      <TagsInput.Label>Skills</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Items />
        <TagsInput.Input placeholder="Add skill" />
        <TagsInput.ClearTrigger aria-label="Clear skills" />
      </TagsInput.Control>
    </TagsInput>
  );
}