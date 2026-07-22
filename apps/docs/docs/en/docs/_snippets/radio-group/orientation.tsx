import { RadioGroup } from '@moduix/react';

const frameworks = ['React', 'Solid', 'Vue'];

export default function RadioGroupOrientationDemo() {
  return (
    <RadioGroup orientation="horizontal" defaultValue="React">
      <RadioGroup.Label>Framework</RadioGroup.Label>
      <div className="radio-inline-items">
        {frameworks.map((framework) => (
          <RadioGroup.Option key={framework} value={framework}>
            {framework}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}