import { Button, SegmentGroup } from '@moduix/react';
import { useState, type FormEvent } from 'react';

const frameworks = [
  { value: 'React', label: 'React' },
  { value: 'Solid', label: 'Solid' },
  { value: 'Svelte', label: 'Svelte' },
  { value: 'Vue', label: 'Vue' },
];

export default function FormSegmentGroupDemo() {
  const [submitted, setSubmitted] = useState('none');
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    setSubmitted(String(formData.get('framework') ?? 'none'));
  };
  return (
    <form className="segment-form" onSubmit={handleSubmit}>
      <SegmentGroup aria-label="Framework" name="framework" defaultValue="React">
        <SegmentGroup.Indicator />
        <SegmentGroup.Items items={frameworks} />
      </SegmentGroup>
      <Button className="segment-button" type="submit">
        Submit
      </Button>
      <output className="segment-output">submitted: {submitted}</output>
    </form>
  );
}