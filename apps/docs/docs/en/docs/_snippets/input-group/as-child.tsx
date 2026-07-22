import { Field, InputGroup } from '@moduix/react';

const repositoryOwner = 'moduix/';

export default function InputGroupAsChildDemo() {
  return (
    <Field className="input-group-demo-field">
      <Field.Label>Repository</Field.Label>
      <InputGroup asChild>
        <div>
          <InputGroup.Addon>{repositoryOwner}</InputGroup.Addon>
          <InputGroup.Input placeholder="components" />
        </div>
      </InputGroup>
    </Field>
  );
}