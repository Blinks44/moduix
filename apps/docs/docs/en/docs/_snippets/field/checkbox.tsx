import { Checkbox, Field } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

export default function CheckboxFieldDemo() {
  return (
    <PreviewLayout maxWidth="12.5rem">
      <Field required>
        <Checkbox.Root>
          <Checkbox.Control />
          <Checkbox.Label>Accept support access</Checkbox.Label>
        </Checkbox.Root>
        <Field.HelperText>Required before the team can inspect workspace data.</Field.HelperText>
        <Field.ErrorText>Support access must be enabled.</Field.ErrorText>
      </Field>
    </PreviewLayout>
  );
}