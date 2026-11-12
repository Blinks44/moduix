<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import { Stack } from '@moduix/svelte/stack';
  import {
    TagsInput,
    TagsInputClearTrigger,
    TagsInputControl,
    TagsInputInput,
    TagsInputItems,
    TagsInputLabel,
  } from '@moduix/svelte/tags-input';
  import styles from '@/components/examples/tags-input/tags-input-controlled-input-value.module.css';

  let inputValue = $state('');
</script>

<Stack class={styles.root}>
  <TagsInput bind:inputValue defaultValue={['Vue']}>
    <TagsInputLabel>Frameworks</TagsInputLabel>
    <TagsInputControl>
      <TagsInputItems />
      <TagsInputInput placeholder="Add framework" />
      <TagsInputClearTrigger aria-label="Clear frameworks" />
    </TagsInputControl>
  </TagsInput>
  <div data-preview-meta>
    <output>Input: {inputValue || 'empty'}</output>
    <Button type="button" size="sm" onclick={() => (inputValue = 'React')}>Set React</Button>
  </div>
</Stack>