import { TagsInput } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

export default function DelimiterPasteTagsInput() {
  return (
    <PreviewLayout maxWidth="24rem">
      <TagsInput defaultValue={['React', 'Solid', 'Vue']} delimiter={/[,;\s]/} addOnPaste>
        <TagsInput.Label>Frameworks</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Items />
          <TagsInput.Input placeholder="Comma, semicolon, or space" />
          <TagsInput.ClearTrigger aria-label="Clear frameworks" />
        </TagsInput.Control>
      </TagsInput>
    </PreviewLayout>
  );
}