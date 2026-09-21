import { Field, FieldLabel } from '@moduix/react/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@moduix/react/input-group';
import styles from '@/components/examples/input-group/input-group-basic.module.css';

const workspacePrefix = '@';

export default function InputGroupDemo() {
  return (
    <Field className={styles.root}>
      <FieldLabel>Workspace</FieldLabel>
      <InputGroup>
        <InputGroupAddon>{workspacePrefix}</InputGroupAddon>
        <InputGroupInput name="workspace" placeholder="maps" />
      </InputGroup>
    </Field>
  );
}
