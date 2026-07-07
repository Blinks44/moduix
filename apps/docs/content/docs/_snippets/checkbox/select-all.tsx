//#region demo
import { Checkbox } from '@moduix/react';
import { useState } from 'react';

const options = [
  { value: 'react', label: 'React' },
  { value: 'solid', label: 'Solid' },
  { value: 'vue', label: 'Vue' },
];

export function CheckboxSelectAllDemo() {
  const [value, setValue] = useState(['react'] as string[]);
  const allValues = options.map((option) => option.value);
  const allSelected = value.length === allValues.length;
  const indeterminate = value.length > 0 && value.length < allValues.length;

  return (
    <Checkbox
      checked={indeterminate ? 'indeterminate' : allSelected}
      onCheckedChange={(details) => setValue(details.checked === true ? allValues : [])}
    >
      <Checkbox.Control />
      <Checkbox.Label>Select all</Checkbox.Label>
      <Checkbox.HiddenInput />
    </Checkbox>
  );
}
//#endregion