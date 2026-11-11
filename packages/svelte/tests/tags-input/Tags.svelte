<script lang="ts">
  import {
    TagsInput,
    TagsInputClearTrigger,
    TagsInputControl,
    TagsInputHiddenInput,
    TagsInputInput,
    TagsInputItems,
    TagsInputLabel,
    type TagsInputRootProps,
  } from '@/components/tags-input';

  let { defaultValue = ['React'], ...props }: TagsInputRootProps = $props();
</script>

<TagsInput {...props} {defaultValue}>
  <TagsInputLabel>Frameworks</TagsInputLabel>
  <TagsInputControl>
    <TagsInputItems />
    <TagsInputInput placeholder="Add framework" />
    <TagsInputClearTrigger />
  </TagsInputControl>
  <TagsInputHiddenInput />
</TagsInput>