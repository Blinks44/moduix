import { InputGroup } from '@moduix/react/input-group';
import styles from '@/components/examples/input-group/input-group-disabled.module.css';

const workspaceHandle = 'maps';

export default function DisabledInputGroupDemo() {
  return (
    <InputGroup className={styles.root} role="group" aria-label="Workspace handle">
      <InputGroup.Addon>@</InputGroup.Addon>
      <InputGroup.Input disabled value={workspaceHandle} />
      <InputGroup.Button disabled>Copy</InputGroup.Button>
    </InputGroup>
  );
}