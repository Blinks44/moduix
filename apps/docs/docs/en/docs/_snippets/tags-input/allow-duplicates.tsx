import { TagsInput } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

export default function AllowDuplicatesTagsInput() {
  return (
    <PreviewLayout maxWidth="24rem">
      <TagsInput allowDuplicates defaultValue={['React', 'React']}>
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