import { Button } from '@moduix/react/button';
import { TagsInput } from '@moduix/react/tags-input';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

export default function FormTagsInput() {
  const [submittedValue, setSubmittedValue] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmittedValue(new FormData(event.currentTarget).get('frameworks')?.toString() ?? '');
  };

  return (
    <form className="tags-input-preview-stack" onSubmit={handleSubmit}>
      <TagsInput defaultValue={['React', 'TypeScript']} name="frameworks">
        <TagsInput.Label>Frameworks</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Items />
          <TagsInput.Input placeholder="Add framework" />
          <TagsInput.ClearTrigger aria-label="Clear frameworks" />
        </TagsInput.Control>
      </TagsInput>
      <PreviewMeta>
        <output>Submitted: {submittedValue || 'none'}</output>
        <Button type="submit" size="sm">
          Submit
        </Button>
      </PreviewMeta>
    </form>
  );
}