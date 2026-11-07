<script lang="ts">
  import {
    TagsInput,
    TagsInputControl,
    TagsInputHiddenInput,
    TagsInputInput,
    TagsInputItems,
    TagsInputLabel,
  } from '@/components/tags-input';
</script>

<form>
  <TagsInput defaultValue={['React']} name="frameworks">
    <TagsInputLabel>Frameworks</TagsInputLabel>
    <TagsInputControl><TagsInputItems /><TagsInputInput /></TagsInputControl>
    <TagsInputHiddenInput />
  </TagsInput>
</form>