import { RadioGroup } from '@moduix/react';
import { useState } from 'react';

const frameworks = ['React', 'Solid', 'Vue'];

export default function ControlledRadioGroupDemo() {
  const [value, setValue] = useState(null as string | null);
  return (
    <div className="radio-group-controlled-demo">
      <RadioGroup value={value} onValueChange={(details) => setValue(details.value)}>
        <RadioGroup.Label>Framework</RadioGroup.Label>
        {frameworks.map((framework) => (
          <RadioGroup.Option key={framework} value={framework}>
            {framework}
          </RadioGroup.Option>
        ))}
      </RadioGroup>
      <output>Selected: {value ?? 'none'}</output>
    </div>
  );
}