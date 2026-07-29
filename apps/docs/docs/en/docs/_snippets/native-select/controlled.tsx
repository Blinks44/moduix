import { NativeSelect } from '@moduix/react';
import { useState } from 'react';

const frameworkOptions = [
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

export default function NativeSelectControlledDemo() {
  const [value, setValue] = useState('react');

  return (
    <NativeSelect
      value={value}
      aria-label="Framework"
      onChange={(event) => setValue(event.target.value)}
    >
      {frameworkOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </NativeSelect>
  );
}