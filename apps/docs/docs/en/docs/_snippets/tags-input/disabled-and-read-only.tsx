import { TagsInput } from '@moduix/react';

export default function StateTagsInput() {
  return (
    <>
      <TagsInput disabled defaultValue={['disabled']}>
        <TagsInput.Label>Disabled</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Items />
          <TagsInput.Input placeholder="Unavailable" />
        </TagsInput.Control>
      </TagsInput>

      <TagsInput readOnly defaultValue={['read-only']}>
        <TagsInput.Label>Read-only</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Items />
          <TagsInput.Input placeholder="Read-only" />
          <TagsInput.ClearTrigger aria-label="Clear read-only tags" />
        </TagsInput.Control>
      </TagsInput>
    </>
  );
}