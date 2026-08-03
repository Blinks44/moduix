import { Field } from '@moduix/react/field';
import { InputGroup } from '@moduix/react/input-group';

const repositoryOwner = 'moduix/';

export default function InputGroupAsChildDemo() {
  return (
    <Field>
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