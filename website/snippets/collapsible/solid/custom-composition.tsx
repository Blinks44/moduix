import { Collapsible } from '@moduix/solid/collapsible';
import { ChevronDown as ChevronDownIcon } from 'lucide-solid';
import styles from '@/components/examples/collapsible/collapsible-custom-composition.module.css';

const recoveryKeys = ['alien-bean-pasta', 'wild-irish-burrito', 'horse-battery-staple'];

export default function CustomCompositionCollapsibleDemo() {
  return (
    <Collapsible class={styles.root}>
      <Collapsible.Trigger
        asChild={(props) => (
          <button {...props()} type="button" class={styles.customTrigger}>
            Styled recovery keys
            <Collapsible.Indicator class={styles.customIndicator}>
              <ChevronDownIcon />
            </Collapsible.Indicator>
          </button>
        )}
      />
      <Collapsible.Content>
        <Collapsible.Body class={styles.customContentBody}>
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