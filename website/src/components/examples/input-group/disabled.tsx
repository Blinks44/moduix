import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@moduix/react/input-group';
import styles from '@/components/examples/input-group/input-group-disabled.module.css';

const workspaceHandle = 'maps';

export default function DisabledInputGroupDemo() {
  return (
    <InputGroup className={styles.root} role="group" aria-label="Workspace handle">
      <InputGroupAddon>@</InputGroupAddon>
      <InputGroupInput disabled value={workspaceHandle} />
      <InputGroupButton disabled>Copy</InputGroupButton>
    </InputGroup>
  );
}