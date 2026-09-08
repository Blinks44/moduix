import { Collapsible } from '@moduix/solid/collapsible';
import styles from '@/components/examples/collapsible/collapsible-basic.module.css';

const recoveryKeys = ['alien-bean-pasta', 'wild-irish-burrito', 'horse-battery-staple'];

export default function CollapsibleDemo() {
  return (
    <Collapsible class={styles.root}>
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
  );
}