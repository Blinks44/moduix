import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@moduix/react/radio-group';
import { Stack } from '@moduix/react/stack';
import { useState } from 'react';

const frameworks = ['React', 'Solid', 'Vue'];

export default function ControlledRadioGroupDemo() {
  const [value, setValue] = useState(null as string | null);
  return (
    <Stack align="center" gap="2">
      <RadioGroup value={value} onValueChange={(details) => setValue(details.value)}>
        <RadioGroupLabel>Framework</RadioGroupLabel>
        {frameworks.map((framework) => (
          <RadioGroupOption key={framework} value={framework}>
            {framework}
          </RadioGroupOption>
        ))}
      </RadioGroup>
      <div data-preview-meta>
        <output>Selected: {value ?? 'none'}</output>
      </div>
    </Stack>
  );
}