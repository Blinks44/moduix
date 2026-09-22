import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
} from '@moduix/react/radio-group';

const frameworks = ['React', 'Solid', 'Vue'];

export default function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="React">
      <RadioGroupLabel>Framework</RadioGroupLabel>
      {frameworks.map((framework) => (
        <RadioGroupOption key={framework} value={framework}>
          {framework}
        </RadioGroupOption>
      ))}
    </RadioGroup>
  );
}
