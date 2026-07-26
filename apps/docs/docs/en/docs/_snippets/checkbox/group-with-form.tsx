import { Button, Checkbox } from '@moduix/react';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

const options = [
  { value: 'react', label: 'React' },
  { value: 'solid', label: 'Solid' },
  { value: 'vue', label: 'Vue' },
];

export default function CheckboxGroupWithFormDemo() {
  const [submitted, setSubmitted] = useState('framework: []');

  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--moduix-spacing-3)',
      }}
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(
          `framework: ${JSON.stringify(new FormData(event.currentTarget).getAll('framework'))}`,
        );
      }}
    >
      <Checkbox.Group defaultValue={['react']} name="framework">
        {options.map((option) => (
          <Checkbox key={option.value} value={option.value}>
            <Checkbox.Control />
            <Checkbox.Label>{option.label}</Checkbox.Label>
          </Checkbox>
        ))}
      </Checkbox.Group>
      <PreviewMeta>
        <output>{submitted}</output>
        <Button type="submit" size="sm">
          Submit
        </Button>
      </PreviewMeta>
    </form>
  );
}