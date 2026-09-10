import { RadioGroup } from '@moduix/solid/radio-group';

const frameworks = ['React', 'Solid', 'Vue'];

export default function InitialValueDemo() {
  return (
    <RadioGroup defaultValue="Solid">
      <RadioGroup.Label>Framework</RadioGroup.Label>
      {frameworks.map((framework) => (
        <RadioGroup.Option value={framework}>{framework}</RadioGroup.Option>
      ))}
    </RadioGroup>
  );
}