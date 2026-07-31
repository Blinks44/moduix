import { Button } from '@moduix/react/button';
import { SegmentGroup } from '@moduix/react/segment-group';
import { useState, type FormEvent } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

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
    <form className="segment-stack" onSubmit={handleSubmit}>
      <SegmentGroup aria-label="Framework" name="framework" defaultValue="React">
        <SegmentGroup.Indicator />
        <SegmentGroup.Items items={frameworks} />
      </SegmentGroup>
      <PreviewMeta>
        <output>Submitted: {submitted}</output>
        <Button type="submit" size="sm">
          Submit
        </Button>
      </PreviewMeta>
    </form>
  );
}