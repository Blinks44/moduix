import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
} from '@moduix/solid/radio-group';

const frameworks = ['React', 'Solid', 'Vue'];

export default function InitialValueDemo() {
  return (
    <RadioGroup defaultValue="Solid">
      <RadioGroupLabel>Framework</RadioGroupLabel>
      {frameworks.map((framework) => (
        <RadioGroupOption value={framework}>{framework}</RadioGroupOption>
      ))}
    </RadioGroup>
  );
}
