import { TagsInput } from '@moduix/react';

export default function DisableEditingTagsInput() {
  return (
    <TagsInput editable={false} defaultValue={['React', 'TypeScript']}>
      <TagsInput.Label>Frameworks</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Items />
        <TagsInput.Input placeholder="Add framework" />
        <TagsInput.ClearTrigger aria-label="Clear frameworks" />
      </TagsInput.Control>
    </TagsInput>
  );
}