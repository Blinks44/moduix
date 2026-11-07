<script lang="ts">
  import {
    TagsInputControl,
    TagsInputHiddenInput,
    TagsInputInput,
    TagsInputItems,
    TagsInputLabel,
    TagsInputRootProvider,
    useTagsInput,
  } from '@/components/tags-input';

  const tagsInput = useTagsInput({
    id: 'provider-tags',
    defaultValue: ['React'],
    name: 'frameworks',
  });

  export const addValue = (value: string) => tagsInput().addValue(value);
</script>

<form>
  <TagsInputRootProvider value={tagsInput}>
    <TagsInputLabel>Frameworks</TagsInputLabel>
    <TagsInputControl>
      <TagsInputItems />
      <TagsInputInput />
    </TagsInputControl>
    <TagsInputHiddenInput />
  </TagsInputRootProvider>
</form>