import {
  Collapsible,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleTrigger,
} from '@moduix/solid/collapsible';
import { ChevronDown as ChevronDownIcon } from 'lucide-solid';
import styles from '@/components/examples/collapsible/collapsible-build-from-parts.module.css';

const recoveryKeys = ['alien-bean-pasta', 'wild-irish-burrito', 'horse-battery-staple'];

export default function BuildFromPartsCollapsibleDemo() {
  return (
    <Collapsible class={styles.root}>
      <CollapsibleTrigger>
        Recovery keys
        <CollapsibleIndicator>
          <ChevronDownIcon strokeWidth={3} />
        </CollapsibleIndicator>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div class={styles.body}>
          <ul class={styles.keysList}>
            {recoveryKeys.map((key) => (
              <li>{key}</li>
            ))}
          </ul>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}