import { TagsInput } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

export default function DisableEditingTagsInput() {
  return (
    <PreviewLayout maxWidth="24rem">
      <TagsInput editable={false} defaultValue={['React', 'TypeScript']}>
        <TagsInput.Label>Frameworks</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Items />
          <TagsInput.Input placeholder="Add framework" />
          <TagsInput.ClearTrigger aria-label="Clear frameworks" />
        </TagsInput.Control>
      </TagsInput>
    </PreviewLayout>
  );
}