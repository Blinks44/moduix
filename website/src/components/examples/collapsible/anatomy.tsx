import {
  Collapsible,
  CollapsibleBody,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleTrigger,
} from '@moduix/react/collapsible';
import styles from '@/components/examples/collapsible/collapsible-basic.module.css';

const recoveryKeys = ['alien-bean-pasta', 'wild-irish-burrito', 'horse-battery-staple'];

// Anatomy scene: open, so the content and body parts can be outlined.
export default function CollapsibleAnatomy() {
  return (
    <Collapsible className={styles.root} defaultOpen>
      <CollapsibleTrigger>
        Recovery keys
        <CollapsibleIndicator />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <CollapsibleBody>
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