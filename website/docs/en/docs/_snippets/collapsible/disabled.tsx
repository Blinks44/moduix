import { Collapsible } from '@moduix/react/collapsible';
import styles from '@/components/examples/collapsible/collapsible-disabled.module.css';

const recoveryKeys = ['alien-bean-pasta', 'wild-irish-burrito', 'horse-battery-staple'];

export default function DisabledCollapsibleDemo() {
  return (
    <Collapsible className={styles.root} disabled>
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
  );
}