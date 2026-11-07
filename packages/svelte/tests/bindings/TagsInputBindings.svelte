<script lang="ts">
  import {
    TagsInput,
    TagsInputControl,
    TagsInputInput,
    TagsInputItems,
    TagsInputLabel,
  } from '@/components/tags-input';

  let value = $state<string[]>(['React']);
  let inputValue = $state('');

  export const write = (key: 'value' | 'inputValue') => {
    if (key === 'value') value = ['Solid', 'Vue'];
    if (key === 'inputValue') inputValue = 'ext';
  };
  export const read = () => ({ value, inputValue });
</script>

<TagsInput bind:value bind:inputValue>
  <TagsInputLabel>Frameworks</TagsInputLabel>
  <TagsInputControl><TagsInputItems /><TagsInputInput /></TagsInputControl>
</TagsInput>