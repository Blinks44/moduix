import {
  TagsInput,
  TagsInputClearTrigger,
  TagsInputControl,
  TagsInputInput,
  TagsInputItems,
  TagsInputLabel,
} from '@moduix/react/tags-input';
import { useState } from 'react';

export default function ControlledTagsInput() {
  const [value, setValue] = useState(['React', 'TypeScript']);
  return (
    <TagsInput value={value} onValueChange={(details) => setValue(details.value)}>
      <TagsInputLabel>Skills</TagsInputLabel>
      <TagsInputControl>
        <TagsInputItems />
        <TagsInputInput placeholder="Add skill" />
        <TagsInputClearTrigger aria-label="Clear skills" />
      </TagsInputControl>
    </TagsInput>
  );
}