import {
  Collapsible,
  CollapsibleBody,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleTrigger,
} from '@moduix/solid/collapsible';
import { ChevronDown as ChevronDownIcon } from 'lucide-solid';
import styles from '@/components/examples/collapsible/collapsible-custom-composition.module.css';

const recoveryKeys = ['alien-bean-pasta', 'wild-irish-burrito', 'horse-battery-staple'];

export default function CustomCompositionCollapsibleDemo() {
  return (
    <Collapsible class={styles.root}>
      <CollapsibleTrigger
        asChild={(props) => (
          <button {...props()} type="button" class={styles.customTrigger}>
            Styled recovery keys
            <CollapsibleIndicator class={styles.customIndicator}>
              <ChevronDownIcon />
            </CollapsibleIndicator>
          </button>
        )}
      />
      <CollapsibleContent>
        <CollapsibleBody class={styles.customContentBody}>
          <ul class={styles.keysList}>
            {recoveryKeys.map((key) => (
              <li>{key}</li>
            ))}
          </ul>
        </CollapsibleBody>
      </CollapsibleContent>
    </Collapsible>
  );
}