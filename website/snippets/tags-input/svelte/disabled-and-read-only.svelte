<script lang="ts">
  import { Stack } from '@moduix/svelte/stack';
  import {
    TagsInput,
    TagsInputClearTrigger,
    TagsInputControl,
    TagsInputInput,
    TagsInputItems,
    TagsInputLabel,
  } from '@moduix/svelte/tags-input';
  import styles from '@/components/examples/tags-input/tags-input-disabled-and-read-only.module.css';
</script>

<Stack class={styles.root}>
  <TagsInput disabled defaultValue={['disabled']}>
    <TagsInputLabel>Disabled</TagsInputLabel>
    <TagsInputControl>
      <TagsInputItems />
      <TagsInputInput placeholder="Unavailable" />
    </TagsInputControl>
  </TagsInput>

  <TagsInput readOnly defaultValue={['read-only']}>
    <TagsInputLabel>Read-only</TagsInputLabel>
    <TagsInputControl>
      <TagsInputItems />
      <TagsInputInput placeholder="Read-only" />
      <TagsInputClearTrigger aria-label="Clear read-only tags" />
    </TagsInputControl>
  </TagsInput>
</Stack>