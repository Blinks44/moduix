import { TagsInput } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

export default function SanitizeBlurTagsInput() {
  return (
    <PreviewLayout maxWidth="24rem">
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
    </PreviewLayout>
  );
}