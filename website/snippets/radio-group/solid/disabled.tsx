import { RadioGroup } from '@moduix/solid/radio-group';

const frameworks = ['React', 'Solid', 'Vue'];

export default function DisabledRadioGroupDemo() {
  return (
    <RadioGroup defaultValue="React" disabled>
      <RadioGroup.Label>Framework</RadioGroup.Label>
      {frameworks.map((framework) => (
        <RadioGroup.Option value={framework}>{framework}</RadioGroup.Option>
      ))}
    </RadioGroup>
  );
}