import { TagsInput } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

const initialTags = ['React', 'TypeScript'];

export default function TagsInputDemo() {
  return (
    <PreviewLayout maxWidth="24rem">
      <TagsInput defaultValue={initialTags} name="frameworks">
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