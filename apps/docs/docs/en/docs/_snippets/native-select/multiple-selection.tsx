import { NativeSelect } from '@moduix/react';

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

const selectedFrameworks = ['react', 'vue'];

export default function NativeSelectMultipleDemo() {
  return (
    <NativeSelect defaultValue={selectedFrameworks} multiple size={3} aria-label="Frameworks">
      {frameworkOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </NativeSelect>
  );
}