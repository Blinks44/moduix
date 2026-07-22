import { TagsInput } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

export default function MaxOverflowTagsInput() {
  return (
    <PreviewLayout maxWidth="24rem">
      <TagsInput max={2} allowOverflow defaultValue={['React', 'Solid']}>
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