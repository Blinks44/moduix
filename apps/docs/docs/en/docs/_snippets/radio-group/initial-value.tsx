import { RadioGroup } from '@moduix/react';

const frameworks = ['React', 'Solid', 'Vue'];

export default function InitialValueDemo() {
  return (
    <RadioGroup defaultValue="Solid">
      <RadioGroup.Label>Framework</RadioGroup.Label>
      {frameworks.map((framework) => (
        <RadioGroup.Option key={framework} value={framework}>
          {framework}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
}