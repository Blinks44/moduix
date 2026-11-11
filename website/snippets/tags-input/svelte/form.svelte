<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    TagsInput,
    TagsInputClearTrigger,
    TagsInputControl,
    TagsInputHiddenInput,
    TagsInputInput,
    TagsInputItems,
    TagsInputLabel,
  } from '@moduix/svelte/tags-input';
  import styles from '@/components/examples/tags-input/tags-input-form.module.css';

  let submittedValue = $state('');

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    submittedValue = new FormData(form).get('frameworks')?.toString() ?? '';
  };
</script>

<form class={styles.root} onsubmit={handleSubmit}>
  <TagsInput defaultValue={['React', 'TypeScript']} name="frameworks">
    <TagsInputLabel>Frameworks</TagsInputLabel>
    <TagsInputControl>
      <TagsInputItems />
      <TagsInputInput placeholder="Add framework" />
      <TagsInputClearTrigger aria-label="Clear frameworks" />
    </TagsInputControl>
    <TagsInputHiddenInput />
  </TagsInput>
  <output>Submitted: {submittedValue || 'none'}</output>
  <Button type="submit" size="sm">Submit</Button>
</form>