import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@moduix/react/radio-group';
import { Stack } from '@moduix/react/stack';

const frameworks = ['React', 'Solid', 'Vue'];

export default function RadioGroupOrientationDemo() {
  return (
    <RadioGroup orientation="horizontal" defaultValue="React">
      <RadioGroupLabel>Framework</RadioGroupLabel>
      <Stack direction="row" wrap="wrap" gap="2">
        {frameworks.map((framework) => (
          <RadioGroupOption key={framework} value={framework}>
            {framework}
          </RadioGroupOption>
        ))}
      </Stack>
    </RadioGroup>
  );
}