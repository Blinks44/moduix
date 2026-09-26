import { Field, FieldLabel } from '@moduix/solid/field';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@moduix/solid/input-group';
import styles from '@/components/examples/input-group/input-group-basic.module.css';

const workspacePrefix = '@';

export default function InputGroupDemo() {
  return (
    <Field class={styles.root}>
      <FieldLabel>Workspace</FieldLabel>
      <InputGroup>
        <InputGroupAddon>{workspacePrefix}</InputGroupAddon>
        <InputGroupInput name="workspace" placeholder="maps" />
      </InputGroup>
    </Field>
  );
}