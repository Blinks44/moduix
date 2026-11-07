<script lang="ts">
  import {
    TagsInput,
    TagsInputClearTrigger,
    TagsInputControl,
    TagsInputInput,
    TagsInputItems,
  } from '@/components/tags-input';
</script>

<TagsInput defaultValue={['React']}>
  <TagsInputControl><TagsInputItems /><TagsInputInput /></TagsInputControl>
  <TagsInputClearTrigger>
    {#snippet asChild(props)}
      <button {...props({ class: 'h-9 rounded-lg' })} type="button">Clear all tags</button>
    {/snippet}
  </TagsInputClearTrigger>
</TagsInput>