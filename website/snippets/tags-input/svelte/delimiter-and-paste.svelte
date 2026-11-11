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

<TagsInput defaultValue={['React', 'Solid', 'Vue']} delimiter={/[,;\s]/} addOnPaste>
  <TagsInputLabel>Frameworks</TagsInputLabel>
  <TagsInputControl>
    <TagsInputItems />
    <TagsInputInput placeholder="Comma, semicolon, or space" />
    <TagsInputClearTrigger aria-label="Clear frameworks" />
  </TagsInputControl>
</TagsInput>