import { TagsInput } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

export default function StateTagsInput() {
  return (
    <PreviewLayout maxWidth="24rem">
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
    </PreviewLayout>
  );
}