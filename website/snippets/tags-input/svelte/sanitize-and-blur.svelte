<script lang="ts">
  import {
    TagsInput,
    TagsInputClearTrigger,
    TagsInputControl,
    TagsInputInput,
    TagsInputItems,
    TagsInputLabel,
  } from '@moduix/svelte/tags-input';

  const sanitizeValue = (value: string) => value.trim().toLowerCase();
</script>

<TagsInput blurBehavior="add" defaultValue={['design']} {sanitizeValue}>
  <TagsInputLabel>Topics</TagsInputLabel>
  <TagsInputControl>
    <TagsInputItems />
    <TagsInputInput placeholder="Blur to add" />
    <TagsInputClearTrigger aria-label="Clear topics" />
  </TagsInputControl>
</TagsInput>