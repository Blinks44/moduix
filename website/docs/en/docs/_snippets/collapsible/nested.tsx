import { Collapsible } from '@moduix/react/collapsible';
import styles from '@/components/examples/collapsible/collapsible-nested.module.css';

const recoveryKeys = ['alien-bean-pasta', 'wild-irish-burrito', 'horse-battery-staple'];

export default function NestedCollapsibleDemo() {
  return (
    <Collapsible className={styles.root}>
      <Collapsible.Trigger>
        Account security
        <Collapsible.Indicator />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Collapsible.Body className={styles.nestedContent}>
          <p>Security options for this account.</p>
          <Collapsible className={styles.nestedRoot}>
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
        </Collapsible.Body>
      </Collapsible.Content>
    </Collapsible>
  );
}