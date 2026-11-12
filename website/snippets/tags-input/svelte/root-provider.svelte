<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import { Stack } from '@moduix/svelte/stack';
  import {
    TagsInputClearTrigger,
    TagsInputControl,
    TagsInputInput,
    TagsInputItems,
    TagsInputLabel,
    TagsInputRootProvider,
    useTagsInput,
  } from '@moduix/svelte/tags-input';
  import styles from '@/components/examples/tags-input/tags-input-root-provider.module.css';

  const id = $props.id();
  const tagsInput = useTagsInput({ id, defaultValue: ['React'] });
</script>

<Stack class={styles.root}>
  <TagsInputRootProvider value={tagsInput}>
    <TagsInputLabel>Frameworks</TagsInputLabel>
    <TagsInputControl>
      <TagsInputItems />
      <TagsInputInput placeholder="Add framework" />
      <TagsInputClearTrigger aria-label="Clear frameworks" />
    </TagsInputControl>
  </TagsInputRootProvider>
  <div data-preview-meta>
    <output>Tags: {tagsInput().value.join(', ') || 'empty'}</output>
    <Button type="button" size="sm" onclick={() => tagsInput().addValue('Solid')}>Add Solid</Button>
    <Button type="button" size="sm" variant="outline" onclick={() => tagsInput().clearValue()}>
      Clear
    </Button>
    <Button type="button" size="sm" variant="outline" onclick={() => tagsInput().focus()}>
      Focus
    </Button>
  </div>
</Stack>