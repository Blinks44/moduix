import { TagsInput } from '@moduix/react';

export default function SanitizeBlurTagsInput() {
  return (
    <TagsInput
      blurBehavior="add"
      sanitizeValue={(value) => value.trim().toLowerCase()}
      defaultValue={['design']}
    >
      <TagsInput.Label>Topics</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Items />
        <TagsInput.Input placeholder="Blur to add" />
        <TagsInput.ClearTrigger aria-label="Clear topics" />
      </TagsInput.Control>
    </TagsInput>
  );
}