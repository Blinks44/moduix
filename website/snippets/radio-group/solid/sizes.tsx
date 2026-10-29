import { RadioGroup, RadioGroupOption } from '@moduix/solid/radio-group';
import { Stack } from '@moduix/solid/stack';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export default function RadioGroupSizesDemo() {
  return (
    <Stack direction="row" align="center" wrap="wrap" gap="4">
      {sizes.map((size) => (
        <RadioGroup size={size} defaultValue={size} aria-label={`Size ${size}`}>
          <RadioGroupOption value={size}>{size.toUpperCase()}</RadioGroupOption>
        </RadioGroup>
      ))}
    </Stack>
  );
}