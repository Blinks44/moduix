import { Collapsible } from '@moduix/react/collapsible';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/collapsible/collapsible-controlled.module.css';

const recoveryKeys = ['alien-bean-pasta', 'wild-irish-burrito', 'horse-battery-staple'];

export default function ControlledCollapsibleDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className={`${styles.layout} ${styles.controlledLayout}`}>
      <Collapsible
        className={styles.root}
        open={open}
        onOpenChange={(details) => setOpen(details.open)}
      >
        <Collapsible.Trigger>
          Recovery keys
          <Collapsible.Indicator />
        </Collapsible.Trigger>
        <Collapsible.Content>
          <Collapsible.Body>
            <ul className={styles.keysList}>
              {recoveryKeys.map((key) => (
                <li key={key}>{key}</li>
              ))}
            </ul>
          </Collapsible.Body>
        </Collapsible.Content>
      </Collapsible>
      <PreviewMeta>
        <output>State: {open ? 'open' : 'closed'}</output>
      </PreviewMeta>
    </div>
  );
}