import { Button } from '@moduix/solid/button';
import { Stack } from '@moduix/solid/stack';
import { TagsInputClearTrigger, TagsInputControl, TagsInputInput, TagsInputItems, TagsInputLabel, TagsInputRootProvider, useTagsInput } from '@moduix/solid/tags-input';
import { createUniqueId } from 'solid-js';
import styles from '@/components/examples/tags-input/tags-input-root-provider.module.css';

export default function RootProviderTagsInput() {
  const tagsInput = useTagsInput({
    id: createUniqueId(),
    defaultValue: ['React'],
  });

  return (
    <Stack class={styles.root}>
      <TagsInputRootProvider value={tagsInput}>
        <TagsInputLabel>Frameworks</TagsInputLabel>
        <TagsInputControl>
          <TagsInputItems />
          <TagsInputInput placeholder="Add framework" />
          <TagsInputClearTrigger aria-label="Clear frameworks" />
        </TagsInputControl>
      </TagsInputRootProvider>
      <output>Tags: {tagsInput().value.join(', ') || 'empty'}</output>
      <Button type="button" size="sm" onClick={() => tagsInput().addValue('Solid')}>
        Add Solid
      </Button>
      <Button type="button" size="sm" variant="outline" onClick={() => tagsInput().clearValue()}>
        Clear
      </Button>
      <Button type="button" size="sm" variant="outline" onClick={() => tagsInput().focus()}>
        Focus
      </Button>
    </Stack>
  );
}
