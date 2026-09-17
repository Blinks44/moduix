import { NativeSelect } from '@moduix/solid/native-select';

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
    <NativeSelect multiple size={3} aria-label="Frameworks">
      {frameworkOptions.map((option) => (
        <option value={option.value} selected={selectedFrameworks.includes(option.value)}>
          {option.label}
        </option>
      ))}
    </NativeSelect>
  );
}