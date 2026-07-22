import { RadioGroup } from '@moduix/react';

const frameworks = ['React', 'Solid', 'Vue'];

export default function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="React">
      <RadioGroup.Label>Framework</RadioGroup.Label>
      {frameworks.map((framework) => (
        <RadioGroup.Option key={framework} value={framework}>
          {framework}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
}