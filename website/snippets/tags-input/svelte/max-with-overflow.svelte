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

<TagsInput defaultValue={['React', 'Solid']} max={2} allowOverflow>
  <TagsInputLabel>Frameworks</TagsInputLabel>
  <TagsInputControl>
    <TagsInputItems />
    <TagsInputInput placeholder="Add framework" />
    <TagsInputClearTrigger aria-label="Clear frameworks" />
  </TagsInputControl>
</TagsInput>