<script lang="ts">
  import {
    TagsInput,
    TagsInputClearTrigger,
    TagsInputControl,
    TagsInputInput,
    TagsInputItems,
    TagsInputLabel,
  } from '@moduix/svelte/tags-input';
  import styles from '@/components/examples/tags-input/tags-input-validation-and-max.module.css';

  let invalidReason = $state('none');
  const validate = (details: { inputValue: string; value: string[] }) =>
    details.inputValue.length >= 3 && !details.value.includes(details.inputValue);
</script>

<div class={styles.root}>
  <TagsInput
    max={3}
    maxLength={12}
    defaultValue={['alpha', 'beta', 'gamma']}
    {validate}
    onValueInvalid={(details) => (invalidReason = details.reason)}
  >
    <TagsInputLabel>Labels</TagsInputLabel>
    <TagsInputControl>
      <TagsInputItems />
      <TagsInputInput placeholder="Add unique label" />
      <TagsInputClearTrigger aria-label="Clear labels" />
    </TagsInputControl>
  </TagsInput>
  <div data-preview-meta>
    <output>Last invalid reason: {invalidReason}</output>
  </div>
</div>