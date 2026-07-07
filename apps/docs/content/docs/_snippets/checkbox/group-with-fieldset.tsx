//#region demo
import { Checkbox, Fieldset } from '@moduix/react';

const options = [
  { value: 'react', label: 'React' },
  { value: 'solid', label: 'Solid' },
  { value: 'vue', label: 'Vue' },
];

export function CheckboxGroupFieldsetDemo() {
  return (
    <Fieldset className="checkbox-fieldset">
      <Fieldset.Legend>Frameworks</Fieldset.Legend>
      <Checkbox.Group defaultValue={['react']} name="frameworks">
        {options.map((option) => (
          <Checkbox key={option.value} value={option.value}>
            <Checkbox.Control />
            <Checkbox.Label>{option.label}</Checkbox.Label>
            <Checkbox.HiddenInput />
          </Checkbox>
        ))}
      </Checkbox.Group>
    </Fieldset>
  );
}
//#endregion