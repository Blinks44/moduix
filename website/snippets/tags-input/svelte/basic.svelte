<script lang="ts">
  import {
    TagsInput,
    TagsInputClearTrigger,
    TagsInputControl,
    TagsInputHiddenInput,
    TagsInputInput,
    TagsInputItems,
    TagsInputLabel,
  } from '@moduix/svelte/tags-input';

  const initialTags = ['React', 'TypeScript'];
</script>

<TagsInput defaultValue={initialTags} name="frameworks">
  <TagsInputLabel>Frameworks</TagsInputLabel>
  <TagsInputControl>
    <TagsInputItems />
    <TagsInputInput placeholder="Add framework" />
    <TagsInputClearTrigger aria-label="Clear frameworks" />
  </TagsInputControl>
  <TagsInputHiddenInput />
</TagsInput>