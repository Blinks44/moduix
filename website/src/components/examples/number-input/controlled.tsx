import { NumberInput, NumberInputField, NumberInputLabel } from '@moduix/react/number-input';
import { Stack } from '@moduix/react/stack';
import { useState } from 'react';

export default function ControlledNumberInputDemo() {
  const [value, setValue] = useState('24');
  return (
    <Stack align="center">
      <NumberInput value={value} onValueChange={(details) => setValue(details.value)}>
        <NumberInputLabel>Controlled value</NumberInputLabel>
        <NumberInputField />
      </NumberInput>
      <div data-preview-meta>
        <output>Current value: {value || 'empty'}</output>
      </div>
    </Stack>
  );
}