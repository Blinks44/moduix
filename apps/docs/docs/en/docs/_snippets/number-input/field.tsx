import { Field, NumberInput } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

export default function NumberInputFieldDemo() {
  return (
    <PreviewLayout alignItems="center" width="content">
      <Field invalid>
        <NumberInput min={1} max={10} required>
          <NumberInput.Label>Items</NumberInput.Label>
          <NumberInput.Field />
        </NumberInput>
        <Field.ErrorText>Value should be between 1 and 10.</Field.ErrorText>
      </Field>
    </PreviewLayout>
  );
}