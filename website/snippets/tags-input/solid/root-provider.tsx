import { Button } from '@moduix/solid/button';
import { Stack } from '@moduix/solid/stack';
import { TagsInput, useTagsInput } from '@moduix/solid/tags-input';
import { createUniqueId } from 'solid-js';
import styles from '@/components/examples/tags-input/tags-input-root-provider.module.css';

export default function RootProviderTagsInput() {
  const tagsInput = useTagsInput({
    id: createUniqueId(),
    defaultValue: ['React'],
  });

  return (
    <Stack class={styles.root}>
      <TagsInput.RootProvider value={tagsInput}>
        <TagsInput.Label>Frameworks</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Items />
          <TagsInput.Input placeholder="Add framework" />
          <TagsInput.ClearTrigger aria-label="Clear frameworks" />
        </TagsInput.Control>
      </TagsInput.RootProvider>
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