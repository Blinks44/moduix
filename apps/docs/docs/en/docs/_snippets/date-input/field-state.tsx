import { DateInput, Field } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

export default function DateInputFieldDemo() {
  return (
    <PreviewLayout alignItems="center" width="10rem">
      <Field invalid>
        <DateInput required invalid name="deadline">
          <DateInput.Label>Deadline</DateInput.Label>
          <DateInput.Control>
            <DateInput.Segments />
          </DateInput.Control>
        </DateInput>
        <Field.ErrorText>Enter a valid deadline.</Field.ErrorText>
      </Field>
    </PreviewLayout>
  );
}