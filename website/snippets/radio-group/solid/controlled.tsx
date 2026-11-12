import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@moduix/solid/radio-group';
import { Stack } from '@moduix/solid/stack';
import { createSignal } from 'solid-js';

const frameworks = ['React', 'Solid', 'Vue'];

export default function ControlledRadioGroupDemo() {
  const [value, setValue] = createSignal<string | null>(null);

  return (
    <Stack align="center" gap="2">
      <RadioGroup value={value()} onValueChange={(details) => setValue(details.value)}>
        <RadioGroupLabel>Framework</RadioGroupLabel>
        {frameworks.map((framework) => (
          <RadioGroupOption value={framework}>{framework}</RadioGroupOption>
        ))}
      </RadioGroup>
      <div data-preview-meta>
        <output>Selected: {value() ?? 'none'}</output>
      </div>
    </Stack>
  );
}