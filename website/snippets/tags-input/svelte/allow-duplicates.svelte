<script lang="ts">
  import {
    TagsInput,
    TagsInputClearTrigger,
    TagsInputControl,
    TagsInputInput,
    TagsInputItems,
    TagsInputLabel,
  } from '@moduix/svelte/tags-input';
</script>

<TagsInput allowDuplicates defaultValue={['React', 'React']}>
  <TagsInputLabel>Frameworks</TagsInputLabel>
  <TagsInputControl>
    <TagsInputItems />
    <TagsInputInput placeholder="Add framework" />
    <TagsInputClearTrigger aria-label="Clear frameworks" />
  </TagsInputControl>
</TagsInput>