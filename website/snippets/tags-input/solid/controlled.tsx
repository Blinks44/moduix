import {
  TagsInput,
  TagsInputClearTrigger,
  TagsInputControl,
  TagsInputInput,
  TagsInputItems,
  TagsInputLabel,
} from '@moduix/solid/tags-input';
import { createSignal } from 'solid-js';

export default function ControlledTagsInput() {
  const [value, setValue] = createSignal(['React', 'TypeScript']);

  return (
    <TagsInput value={value()} onValueChange={(details) => setValue(details.value)}>
      <TagsInputLabel>Skills</TagsInputLabel>
      <TagsInputControl>
        <TagsInputItems />
        <TagsInputInput placeholder="Add skill" />
        <TagsInputClearTrigger aria-label="Clear skills" />
      </TagsInputControl>
    </TagsInput>
  );
}