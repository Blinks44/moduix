import { Button } from '@moduix/solid/button';
import { TagsInput, TagsInputClearTrigger, TagsInputControl, TagsInputHiddenInput, TagsInputInput, TagsInputItems, TagsInputLabel } from '@moduix/solid/tags-input';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/tags-input/tags-input-form.module.css';

export default function FormTagsInput() {
  const [submittedValue, setSubmittedValue] = createSignal('');

  const handleSubmit = (event: SubmitEvent & { currentTarget: HTMLFormElement }) => {
    event.preventDefault();
    setSubmittedValue(new FormData(event.currentTarget).get('frameworks')?.toString() ?? '');
  };

  return (
    <form class={styles.root} onSubmit={handleSubmit}>
      <TagsInput defaultValue={['React', 'TypeScript']} name="frameworks">
        <TagsInputLabel>Frameworks</TagsInputLabel>
        <TagsInputControl>
          <TagsInputItems />
          <TagsInputInput placeholder="Add framework" />
          <TagsInputClearTrigger aria-label="Clear frameworks" />
        </TagsInputControl>
        <TagsInputHiddenInput />
      </TagsInput>
      <output>Submitted: {submittedValue() || 'none'}</output>
      <Button type="submit" size="sm">
        Submit
      </Button>
    </form>
  );
}
