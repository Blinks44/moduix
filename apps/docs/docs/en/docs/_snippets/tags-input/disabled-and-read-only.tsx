import { Stack } from '@moduix/react/stack';
import { TagsInput } from '@moduix/react/tags-input';

export default function StateTagsInput() {
  return (
    <Stack className="tags-input-preview-stack" gap="var(--moduix-spacing-3)">
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
    </Stack>
  );
}