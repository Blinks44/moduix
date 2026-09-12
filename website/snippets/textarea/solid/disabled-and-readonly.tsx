import { Textarea } from '@moduix/solid/textarea';
import styles from '@/components/examples/textarea/textarea-disabled-and-readonly.module.css';

export default function DisabledAndReadonlyTextareaDemo() {
  return (
    <div class={styles.root}>
      <Textarea aria-label="Disabled textarea" disabled placeholder="Disabled textarea" />
      <Textarea aria-label="Read-only textarea" readOnly value="Read-only text value" />
    </div>
  );
}