import { Field, FieldLabel } from '@moduix/solid/field';
import { InputGroup } from '@moduix/solid/input-group';
import styles from '@/components/examples/input-group/input-group-basic.module.css';

const workspacePrefix = '@';

export default function InputGroupDemo() {
  return (
    <Field class={styles.root}>
      <FieldLabel>Workspace</FieldLabel>
      <InputGroup>
        <InputGroup.Addon>{workspacePrefix}</InputGroup.Addon>
        <InputGroup.Input name="workspace" placeholder="maps" />
      </InputGroup>
    </Field>
  );
}
