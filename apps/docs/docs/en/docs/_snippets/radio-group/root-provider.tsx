import { RadioGroup, useRadioGroup } from '@moduix/react';

const frameworks = ['React', 'Solid', 'Vue'];

export default function RadioGroupRootProviderDemo() {
  const radioGroup = useRadioGroup({
    defaultValue: 'React',
  });
  return (
    <div className="radio-stack">
      <RadioGroup.RootProvider value={radioGroup}>
        <RadioGroup.Label>Framework</RadioGroup.Label>
        {frameworks.map((framework) => (
          <RadioGroup.Option key={framework} value={framework}>
            {framework}
          </RadioGroup.Option>
        ))}
      </RadioGroup.RootProvider>
      <button className="radio-button" type="button" onClick={() => radioGroup.setValue('Solid')}>
        Set to Solid
      </button>
    </div>
  );
}