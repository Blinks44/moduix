import { Button } from '@moduix/react/button';
import { Stack } from '@moduix/react/stack';
import { TagsInput, useTagsInput } from '@moduix/react/tags-input';
import { useId } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

export default function RootProviderTagsInput() {
  const id = useId();
  const tagsInput = useTagsInput({
    id,
    defaultValue: ['React'],
  });
  return (
    <Stack className="tags-input-preview-stack" gap="var(--moduix-spacing-3)">
      <TagsInput.RootProvider value={tagsInput}>
        <TagsInput.Label>Frameworks</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Items />
          <TagsInput.Input placeholder="Add framework" />
          <TagsInput.ClearTrigger aria-label="Clear frameworks" />
        </TagsInput.Control>
      </TagsInput.RootProvider>
      <PreviewMeta>
        <output>Tags: {tagsInput.value.join(', ') || 'empty'}</output>
        <Button type="button" size="sm" onClick={() => tagsInput.addValue('Solid')}>
          Add Solid
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={() => tagsInput.clearValue()}>
          Clear
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={tagsInput.focus}>
          Focus
        </Button>
      </PreviewMeta>
    </Stack>
  );
}