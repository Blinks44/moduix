import { Collapsible } from '@moduix/react/collapsible';
import { ChevronDown as ChevronDownIcon } from 'lucide-react';
import styles from '@/components/examples/collapsible/collapsible-custom-composition.module.css';

const recoveryKeys = ['alien-bean-pasta', 'wild-irish-burrito', 'horse-battery-staple'];

export default function CustomCompositionCollapsibleDemo() {
  return (
    <Collapsible className={styles.root}>
      <Collapsible.Trigger asChild>
        <button type="button" className={styles.customTrigger}>
          Styled recovery keys
          <Collapsible.Indicator className={styles.customIndicator}>
            <ChevronDownIcon />
          </Collapsible.Indicator>
        </button>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Collapsible.Body className={styles.customContentBody}>
          <ul className={styles.keysList}>
            {recoveryKeys.map((key) => (
              <li key={key}>{key}</li>
            ))}
          </ul>
        </Collapsible.Body>
      </Collapsible.Content>
    </Collapsible>
  );
}