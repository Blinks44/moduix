import {
  Checkbox,
  CheckboxControl,
  CheckboxGroup,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/react/checkbox';
import { Stack } from '@moduix/react/stack';
import { useState } from 'react';

const options = [
  { value: 'react', label: 'React' },
  { value: 'solid', label: 'Solid' },
  { value: 'vue', label: 'Vue' },
];

export default function CheckboxSelectAllDemo() {
  const [value, setValue] = useState(['react'] as string[]);
  const allValues = options.map((option) => option.value);
  const allSelected = value.length === allValues.length;
  const indeterminate = value.length > 0 && value.length < allValues.length;

  return (
    <Stack gap="2">
      <Checkbox
        checked={indeterminate ? 'indeterminate' : allSelected}
        onCheckedChange={(details) => setValue(details.checked === true ? allValues : [])}
      >
        <CheckboxControl />
        <CheckboxLabel>Select all</CheckboxLabel>
        <CheckboxHiddenInput />
      </Checkbox>
      <CheckboxGroup value={value} onValueChange={setValue} name="frameworks">
        {options.map((option) => (
          <Checkbox key={option.value} value={option.value}>
            <CheckboxControl />
            <CheckboxLabel>{option.label}</CheckboxLabel>
            <CheckboxHiddenInput />
          </Checkbox>
        ))}
      </CheckboxGroup>
    </Stack>
  );
}