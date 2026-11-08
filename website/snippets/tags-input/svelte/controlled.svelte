<script lang="ts">
  import {
    TagsInput,
    TagsInputClearTrigger,
    TagsInputControl,
    TagsInputInput,
    TagsInputItems,
    TagsInputLabel,
  } from '@moduix/svelte/tags-input';

  let value = $state(['React', 'TypeScript']);
</script>

<TagsInput bind:value>
  <TagsInputLabel>Skills</TagsInputLabel>
  <TagsInputControl>
    <TagsInputItems />
    <TagsInputInput placeholder="Add skill" />
    <TagsInputClearTrigger aria-label="Clear skills" />
  </TagsInputControl>
</TagsInput>