import { Button } from '@moduix/solid/button';
import { SegmentGroup, SegmentGroupIndicator, SegmentGroupItems } from '@moduix/solid/segment-group';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/segment-group/segment-group-form-submission.module.css';

const frameworks = [
  { value: 'React', label: 'React' },
  { value: 'Solid', label: 'Solid' },
  { value: 'Svelte', label: 'Svelte' },
  { value: 'Vue', label: 'Vue' },
];

export default function FormSegmentGroupDemo() {
  const [submitted, setSubmitted] = createSignal('none');

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    setSubmitted(String(new FormData(form).get('framework') ?? 'none'));
  }

  return (
    <form class={styles.root} onSubmit={handleSubmit}>
      <SegmentGroup aria-label="Framework" name="framework" defaultValue="React">
        <SegmentGroupIndicator />
        <SegmentGroupItems items={frameworks} />
      </SegmentGroup>
      <output>Submitted: {submitted()}</output>
      <Button type="submit" size="sm">
        Submit
      </Button>
    </form>
  );
}