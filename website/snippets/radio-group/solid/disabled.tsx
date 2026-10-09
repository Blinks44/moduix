import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@moduix/solid/radio-group';

const frameworks = ['React', 'Solid', 'Vue'];

export default function DisabledRadioGroupDemo() {
  return (
    <RadioGroup defaultValue="React" disabled>
      <RadioGroupLabel>Framework</RadioGroupLabel>
      {frameworks.map((framework) => (
        <RadioGroupOption value={framework}>{framework}</RadioGroupOption>
      ))}
    </RadioGroup>
  );
}