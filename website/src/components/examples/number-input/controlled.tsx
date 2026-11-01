import { NumberInput, NumberInputField, NumberInputLabel } from '@moduix/react/number-input';
import { Stack } from '@moduix/react/stack';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

export default function ControlledNumberInputDemo() {
  const [value, setValue] = useState('24');
  return (
    <Stack align="center">
      <NumberInput value={value} onValueChange={(details) => setValue(details.value)}>
        <NumberInputLabel>Controlled value</NumberInputLabel>
        <NumberInputField />
      </NumberInput>
      <PreviewMeta>
        <output>Current value: {value || 'empty'}</output>
      </PreviewMeta>
    </Stack>
  );
}