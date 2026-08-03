import { Field } from '@moduix/react/field';
import { Input } from '@moduix/react/input';

export default function InputAsChildDemo() {
  return (
    <Field>
      <Field.Label>Repository</Field.Label>
      <Input asChild>
        <input name="repository" placeholder="owner/project" />
      </Input>
    </Field>
  );
}