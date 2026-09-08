import { Collapsible } from '@moduix/solid/collapsible';
import styles from '@/components/examples/collapsible/collapsible-nested.module.css';

const recoveryKeys = ['alien-bean-pasta', 'wild-irish-burrito', 'horse-battery-staple'];

export default function NestedCollapsibleDemo() {
  return (
    <Collapsible class={styles.root}>
      <Collapsible.Trigger>
        Account security
        <Collapsible.Indicator />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Collapsible.Body class={styles.nestedContent}>
          <p>Security options for this account.</p>
          <Collapsible class={styles.nestedRoot}>
            <Collapsible.Trigger>
              Recovery keys
              <Collapsible.Indicator />
            </Collapsible.Trigger>
            <Collapsible.Content>
              <Collapsible.Body>
                <ul class={styles.keysList}>
                  {recoveryKeys.map((key) => (
                    <li>{key}</li>
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