<script lang="ts">
  import {
    TagsInput,
    TagsInputClearTrigger,
    TagsInputControl,
    TagsInputInput,
    TagsInputItems,
    TagsInputLabel,
  } from '@/components/tags-input';

  let { details }: { details: string[][] } = $props();
  let value: string[] = $state(['React']);
</script>

<TagsInput bind:value onValueChange={(event) => details.push(event.value)}>
  <TagsInputLabel>Controlled frameworks</TagsInputLabel>
  <TagsInputControl>
    <TagsInputItems />
    <TagsInputInput />
    <TagsInputClearTrigger aria-label="Clear frameworks" />
  </TagsInputControl>
</TagsInput>
<output>{value.join(',')}</output>