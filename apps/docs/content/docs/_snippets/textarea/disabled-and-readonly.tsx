/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Textarea } from '@moduix/react';
import styles from '@/components/examples/textarea.module.css';

export function DisabledAndReadonlyTextareaDemo() {
  return (
    <div className={styles.stack}>
      <Textarea aria-label="Disabled textarea" disabled placeholder="Disabled textarea" />
      <Textarea aria-label="Read-only textarea" readOnly value="Read-only text value" />
    </div>
  );
}

//#endregion