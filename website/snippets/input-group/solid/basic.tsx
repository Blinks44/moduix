import { Field } from '@moduix/solid/field';
import { InputGroup } from '@moduix/solid/input-group';
import styles from '@/components/examples/input-group/input-group-basic.module.css';

const workspacePrefix = '@';

export default function InputGroupDemo() {
  return (
    <Field class={styles.root}>
      <Field.Label>Workspace</Field.Label>
      <InputGroup>
        <InputGroup.Addon>{workspacePrefix}</InputGroup.Addon>
        <InputGroup.Input name="workspace" placeholder="maps" />
      </InputGroup>
    </Field>
  );
}