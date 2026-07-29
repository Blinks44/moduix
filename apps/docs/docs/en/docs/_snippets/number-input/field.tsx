import { Field, NumberInput } from '@moduix/react';

export default function NumberInputFieldDemo() {
  return (
    <Field invalid style={{ justifyItems: 'center', textAlign: 'center' }}>
      <NumberInput min={1} max={10} required>
        <NumberInput.Label>Items</NumberInput.Label>
        <NumberInput.Field />
      </NumberInput>
      <Field.HelperText>Choose between 1 and 10 items.</Field.HelperText>
      <Field.ErrorText>Value should be between 1 and 10.</Field.ErrorText>
    </Field>
  );
}