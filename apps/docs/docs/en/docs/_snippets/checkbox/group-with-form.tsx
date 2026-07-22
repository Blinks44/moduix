import { Button, Checkbox } from '@moduix/react';
import { useState } from 'react';
import { PreviewLayout } from '@/components/examples/preview-layout';

const options = [
  { value: 'react', label: 'React' },
  { value: 'solid', label: 'Solid' },
  { value: 'vue', label: 'Vue' },
];

export default function CheckboxGroupWithFormDemo() {
  const [submitted, setSubmitted] = useState('framework: []');

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(
          `framework: ${JSON.stringify(new FormData(event.currentTarget).getAll('framework'))}`,
        );
      }}
    >
      <PreviewLayout alignItems="center" gap="var(--moduix-spacing-3)">
        <Checkbox.Group defaultValue={['react']} name="framework">
          {options.map((option) => (
            <Checkbox key={option.value} value={option.value}>
              <Checkbox.Control />
              <Checkbox.Label>{option.label}</Checkbox.Label>
            </Checkbox>
          ))}
        </Checkbox.Group>
        <Button type="submit">Submit</Button>
        <output className="checkbox-result">{submitted}</output>
      </PreviewLayout>
    </form>
  );
}