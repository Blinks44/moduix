import {
  Collapsible,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleTrigger,
} from '@moduix/react/collapsible';
import { ChevronDown as ChevronDownIcon } from 'lucide-react';
import styles from '@/components/examples/collapsible/collapsible-build-from-parts.module.css';

const recoveryKeys = ['alien-bean-pasta', 'wild-irish-burrito', 'horse-battery-staple'];

export default function BuildFromPartsCollapsibleDemo() {
  return (
    <Collapsible className={styles.root}>
      <CollapsibleTrigger>
        Recovery keys
        <CollapsibleIndicator>
          <ChevronDownIcon strokeWidth={3} />
        </CollapsibleIndicator>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className={styles.body}>
          <ul className={styles.keysList}>
            {recoveryKeys.map((key) => (
              <li key={key}>{key}</li>
            ))}
          </ul>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}