import { Field } from '@moduix/react/field';
import { Textarea } from '@moduix/react/textarea';

export default function TextareaFieldValidationDemo() {
  return (
    <Field invalid required>
      <Field.Label>Details</Field.Label>
      <Textarea minLength={10} placeholder="Add at least 10 characters" />
      <Field.HelperText>
        Include enough detail for the team to reproduce the issue.
      </Field.HelperText>
      <Field.ErrorText>Please provide details.</Field.ErrorText>
      <Field.ErrorText>Enter at least 10 characters.</Field.ErrorText>
    </Field>
  );
}