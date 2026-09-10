import { Input } from '@moduix/solid/input';
import styles from '@/components/examples/input/input-disabled-and-readonly.module.css';

export default function InputStatesDemo() {
  return (
    <div class={styles.root}>
      <Input disabled aria-label="Disabled input" placeholder="Disabled input" />
      <Input readOnly aria-label="Read-only workspace" value="Assigned workspace" />
    </div>
  );
}