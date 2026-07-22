import { DateInput, Field } from '@moduix/react';

export default function DateInputFieldDemo() {
  return (
    <Field invalid>
      <DateInput required invalid name="deadline">
        <DateInput.Label>Deadline</DateInput.Label>
        <DateInput.Control>
          <DateInput.Segments />
        </DateInput.Control>
      </DateInput>
      <Field.ErrorText>Enter a valid deadline.</Field.ErrorText>
    </Field>
  );
}