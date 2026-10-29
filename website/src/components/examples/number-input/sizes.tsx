import { NumberInput, NumberInputField, NumberInputLabel } from '@moduix/react/number-input';
import { Stack } from '@moduix/react/stack';

const sizes = [
  ['xs', 'Extra small'],
  ['sm', 'Small'],
  ['md', 'Medium'],
  ['lg', 'Large'],
  ['xl', 'Extra large'],
] as const;

export default function NumberInputSizesDemo() {
  return (
    <Stack align="flex-start" gap="3">
      {sizes.map(([size, label]) => (
        <NumberInput key={size} size={size} defaultValue="8">
          <NumberInputLabel>{label}</NumberInputLabel>
          <NumberInputField />
        </NumberInput>
      ))}
    </Stack>
  );
}