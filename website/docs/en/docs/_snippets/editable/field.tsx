import { Editable } from '@moduix/react/editable';
import { Field } from '@moduix/react/field';

export default function FieldEditableDemo() {
  return (
    <Field invalid>
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