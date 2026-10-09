import {
  Checkbox,
  CheckboxControl,
  CheckboxGroup,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/react/checkbox';

const options = [
  { value: 'react', label: 'React' },
  { value: 'solid', label: 'Solid' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
];

export default function CheckboxMaxSelectedDemo() {
  return (
    <CheckboxGroup defaultValue={['react', 'solid']} maxSelectedValues={2} name="frameworks">
      {options.map((option) => (
        <Checkbox key={option.value} value={option.value}>
          <CheckboxControl />
          <CheckboxLabel>{option.label}</CheckboxLabel>
          <CheckboxHiddenInput />
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}