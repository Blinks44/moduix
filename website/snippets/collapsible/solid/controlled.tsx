import {
  Collapsible,
  CollapsibleBody,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleTrigger,
} from '@moduix/solid/collapsible';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/collapsible/collapsible-controlled.module.css';

const recoveryKeys = ['alien-bean-pasta', 'wild-irish-burrito', 'horse-battery-staple'];

export default function ControlledCollapsibleDemo() {
  const [open, setOpen] = createSignal(false);

  return (
    <div class={`${styles.layout} ${styles.controlledLayout}`}>
      <Collapsible
        class={styles.root}
        open={open()}
        onOpenChange={(details) => setOpen(details.open)}
      >
        <CollapsibleTrigger>
          Recovery keys
          <CollapsibleIndicator />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CollapsibleBody>
            <ul class={styles.keysList}>
              {recoveryKeys.map((key) => (
                <li>{key}</li>
              ))}
            </ul>
          </CollapsibleBody>
        </CollapsibleContent>
      </Collapsible>
      <output>State: {open() ? 'open' : 'closed'}</output>
    </div>
  );
}