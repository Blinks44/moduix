import { PinInput, PinInputControl, PinInputInputs, PinInputLabel } from '@moduix/react/pin-input';
import { Stack } from '@moduix/react/stack';

const sizes = [
  ['xs', 'Extra small'],
  ['sm', 'Small'],
  ['md', 'Medium'],
  ['lg', 'Large'],
  ['xl', 'Extra large'],
] as const;

export default function PinInputSizesDemo() {
  return (
    <Stack gap="3">
      {sizes.map(([size, label]) => (
        <PinInput key={size} count={4} size={size}>
          <PinInputLabel>{label}</PinInputLabel>
          <PinInputControl>
            <PinInputInputs />
          </PinInputControl>
        </PinInput>
      ))}
    </Stack>
  );
}