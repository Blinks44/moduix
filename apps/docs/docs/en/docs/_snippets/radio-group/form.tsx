import { Button } from '@moduix/react/button';
import { RadioGroup } from '@moduix/react/radio-group';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

const frameworks = ['React', 'Solid', 'Vue'];

export default function RadioGroupFormDemo() {
  const [submitted, setSubmitted] = useState('Not submitted');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(`Submitted: ${new FormData(event.currentTarget).get('framework')}`);
  }

  return (
    <form
      className="radio-group-preview-stack"
      onReset={() => setSubmitted('Not submitted')}
      onSubmit={handleSubmit}
    >
      <RadioGroup defaultValue="React" name="framework">
        <RadioGroup.Label>Framework</RadioGroup.Label>
        {frameworks.map((framework) => (
          <RadioGroup.Option key={framework} value={framework}>
            {framework}
          </RadioGroup.Option>
        ))}
      </RadioGroup>
      <PreviewMeta>
        <output>{submitted}</output>
        <Button size="sm" type="submit">
          Submit
        </Button>
        <Button size="sm" type="reset" variant="outline">
          Reset
        </Button>
      </PreviewMeta>
    </form>
  );
}