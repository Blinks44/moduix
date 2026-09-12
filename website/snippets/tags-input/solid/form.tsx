import { Button } from '@moduix/solid/button';
import { TagsInput } from '@moduix/solid/tags-input';
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
        <TagsInput.Label>Frameworks</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Items />
          <TagsInput.Input placeholder="Add framework" />
          <TagsInput.ClearTrigger aria-label="Clear frameworks" />
        </TagsInput.Control>
        <TagsInput.HiddenInput />
      </TagsInput>
      <output>Submitted: {submittedValue() || 'none'}</output>
      <Button type="submit" size="sm">
        Submit
      </Button>
    </form>
  );
}