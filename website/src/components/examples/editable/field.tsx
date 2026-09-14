import { Editable } from '@moduix/react/editable';
import { Field } from '@moduix/react/field';
import styles from '@/components/examples/editable/editable-field.module.css';

export default function FieldEditableDemo() {
  return (
    <Field className={styles.root} invalid>
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