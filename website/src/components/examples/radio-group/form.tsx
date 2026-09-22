import { Button } from '@moduix/react/button';
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@moduix/react/radio-group';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/radio-group/radio-group-form.module.css';

const frameworks = ['React', 'Solid', 'Vue'];

export default function RadioGroupFormDemo() {
  const [submitted, setSubmitted] = useState('Not submitted');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(`Submitted: ${new FormData(event.currentTarget).get('framework')}`);
  }

  return (
    <form
      className={styles.stack}
      onReset={() => setSubmitted('Not submitted')}
      onSubmit={handleSubmit}
    >
      <RadioGroup defaultValue="React" name="framework">
        <RadioGroupLabel>Framework</RadioGroupLabel>
        {frameworks.map((framework) => (
          <RadioGroupOption key={framework} value={framework}>
            {framework}
          </RadioGroupOption>
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