import { Editable, Field } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

export default function FieldEditableDemo() {
  return (
    <PreviewLayout alignItems="center" width="20rem">
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
    </PreviewLayout>
  );
}