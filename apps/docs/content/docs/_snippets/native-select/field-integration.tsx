/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Field, NativeSelect } from '@moduix/react';

const frameworkOptions = [
  {
    value: '',
    label: 'Choose framework',
    disabled: true,
  },
  {
    value: 'react',
    label: 'React',
  },
  {
    value: 'vue',
    label: 'Vue',
  },
  {
    value: 'svelte',
    label: 'Svelte',
  },
];

export function NativeSelectFieldDemo() {
  return (
    <Field.Root className="nativeSelectFieldDemo" invalid required>
      <Field.Label>Framework</Field.Label>
      <NativeSelect defaultValue="" name="framework">
        {frameworkOptions.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </NativeSelect>
      <Field.ErrorText>Select a framework.</Field.ErrorText>
    </Field.Root>
  );
}

//#endregion