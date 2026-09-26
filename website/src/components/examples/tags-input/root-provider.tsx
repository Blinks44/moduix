import { Button } from '@moduix/react/button';
import { Stack } from '@moduix/react/stack';
import {
  TagsInputClearTrigger,
  TagsInputControl,
  TagsInputInput,
  TagsInputItems,
  TagsInputLabel,
  TagsInputRootProvider,
  useTagsInput,
} from '@moduix/react/tags-input';
import { useId } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/tags-input/tags-input-root-provider.module.css';

export default function RootProviderTagsInput() {
  const id = useId();
  const tagsInput = useTagsInput({
    id,
    defaultValue: ['React'],
  });
  return (
    <Stack className={styles.root}>
      <TagsInputRootProvider value={tagsInput}>
        <TagsInputLabel>Frameworks</TagsInputLabel>
        <TagsInputControl>
          <TagsInputItems />
          <TagsInputInput placeholder="Add framework" />
          <TagsInputClearTrigger aria-label="Clear frameworks" />
        </TagsInputControl>
      </TagsInputRootProvider>
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