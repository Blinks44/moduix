import { RadioGroup } from '@moduix/solid/radio-group';

const frameworks = ['React', 'Solid', 'Vue'];

export default function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="React">
      <RadioGroup.Label>Framework</RadioGroup.Label>
      {frameworks.map((framework) => (
        <RadioGroup.Option value={framework}>{framework}</RadioGroup.Option>
      ))}
    </RadioGroup>
  );
}