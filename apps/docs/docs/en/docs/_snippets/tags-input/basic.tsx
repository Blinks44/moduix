import { TagsInput } from '@moduix/react';

const initialTags = ['React', 'TypeScript'];

export default function TagsInputDemo() {
  return (
    <TagsInput defaultValue={initialTags} name="frameworks">
      <TagsInput.Label>Frameworks</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Items />
        <TagsInput.Input placeholder="Add framework" />
        <TagsInput.ClearTrigger aria-label="Clear frameworks" />
      </TagsInput.Control>
    </TagsInput>
  );
}