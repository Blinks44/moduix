/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { NativeSelect } from '@moduix/react';

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

export function NativeSelectDemo() {
  return (
    <NativeSelect defaultValue="">
      {frameworkOptions.map((option) => (
        <option key={option.value} value={option.value} disabled={option.disabled}>
          {option.label}
        </option>
      ))}
    </NativeSelect>
  );
}

//#endregion