<script lang="ts">
  import {
    TagsInput,
    TagsInputClearTrigger,
    TagsInputControl,
    TagsInputInput,
    TagsInputItems,
    TagsInputLabel,
  } from '@/components/tags-input';
</script>

<TagsInput class="w-80" defaultValue={['React']}>
  <TagsInputLabel>Styled frameworks</TagsInputLabel>
  <TagsInputControl class="rounded-lg">
    <TagsInputItems />
    <TagsInputInput class="h-8" />
    <TagsInputClearTrigger class="size-5" aria-label="Clear styled frameworks" />
  </TagsInputControl>
</TagsInput>