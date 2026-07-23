import { Checkbox, Fieldset } from '@moduix/react';

const options = [
  { value: 'react', label: 'React' },
  { value: 'solid', label: 'Solid' },
  { value: 'vue', label: 'Vue' },
];

export default function CheckboxGroupFieldsetDemo() {
  return (
    <Fieldset>
      <Fieldset.Legend>Frameworks</Fieldset.Legend>
      <Checkbox.Group defaultValue={['react']} name="frameworks">
        {options.map((option) => (
          <Checkbox key={option.value} value={option.value}>
            <Checkbox.Control />
            <Checkbox.Label>{option.label}</Checkbox.Label>
          </Checkbox>
        ))}
      </Checkbox.Group>
    </Fieldset>
  );
}