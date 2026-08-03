import { Field } from '@moduix/react/field';
import { InputGroup } from '@moduix/react/input-group';

const workspacePrefix = '@';

export default function InputGroupDemo() {
  return (
    <Field>
      <Field.Label>Workspace</Field.Label>
      <InputGroup>
        <InputGroup.Addon>{workspacePrefix}</InputGroup.Addon>
        <InputGroup.Input name="workspace" placeholder="maps" />
      </InputGroup>
    </Field>
  );
}