import { Field, Input } from '@moduix/react';

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