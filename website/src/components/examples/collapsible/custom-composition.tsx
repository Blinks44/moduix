import {
  Collapsible,
  CollapsibleBody,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleTrigger,
} from '@moduix/react/collapsible';
import { ChevronDown as ChevronDownIcon } from 'lucide-react';
import styles from '@/components/examples/collapsible/collapsible-custom-composition.module.css';

const recoveryKeys = ['alien-bean-pasta', 'wild-irish-burrito', 'horse-battery-staple'];

export default function CustomCompositionCollapsibleDemo() {
  return (
    <Collapsible className={styles.root}>
      <CollapsibleTrigger asChild>
        <button type="button" className={styles.customTrigger}>
          Styled recovery keys
          <CollapsibleIndicator className={styles.customIndicator}>
            <ChevronDownIcon />
          </CollapsibleIndicator>
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <CollapsibleBody className={styles.customContentBody}>
          <ul className={styles.keysList}>
            {recoveryKeys.map((key) => (
              <li key={key}>{key}</li>
            ))}
          </ul>
        </CollapsibleBody>
      </CollapsibleContent>
    </Collapsible>
  );
}