import { Editable, Field } from '@moduix/react';

export default function FieldEditableDemo() {
  return (
    <Field className="centered-field-example" invalid>
      <Editable defaultValue="" placeholder="Click to edit your bio" required>
        <Editable.Label>Bio</Editable.Label>
        <Editable.Area>
          <Editable.Input />
          <Editable.Preview />
        </Editable.Area>
        <Editable.Controls />
      </Editable>
      <Field.ErrorText>Bio is required.</Field.ErrorText>
    </Field>
  );
}