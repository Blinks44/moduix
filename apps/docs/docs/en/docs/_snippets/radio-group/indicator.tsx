import { RadioGroup } from '@moduix/react';

const frameworks = ['React', 'Solid', 'Vue'];

export default function RadioGroupIndicatorDemo() {
  return (
    <div className="radio-indicator-stack">
      <div>Framework</div>
      <RadioGroup aria-label="Framework" defaultValue="React" className="radio-indicator-root">
        <RadioGroup.Indicator className="radio-group-indicator" />
        {frameworks.map((framework) => (
          <RadioGroup.Option key={framework} value={framework}>
            {framework}
          </RadioGroup.Option>
        ))}
      </RadioGroup>
    </div>
  );
}