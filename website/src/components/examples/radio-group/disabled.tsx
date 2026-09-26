import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@moduix/react/radio-group';

const frameworks = ['React', 'Solid', 'Vue'];

export default function DisabledRadioGroupDemo() {
  return (
    <RadioGroup defaultValue="React" disabled>
      <RadioGroupLabel>Framework</RadioGroupLabel>
      {frameworks.map((framework) => (
        <RadioGroupOption key={framework} value={framework}>
          {framework}
        </RadioGroupOption>
      ))}
    </RadioGroup>
  );
}