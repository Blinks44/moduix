import {
  Collapsible,
  CollapsibleBody,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleTrigger,
} from '@moduix/solid/collapsible';
import styles from '@/components/examples/collapsible/collapsible-default-open.module.css';

const recoveryKeys = ['alien-bean-pasta', 'wild-irish-burrito', 'horse-battery-staple'];

export default function DefaultOpenCollapsibleDemo() {
  return (
    <Collapsible class={styles.root} defaultOpen>
      <CollapsibleTrigger>
        Recovery keys
        <CollapsibleIndicator />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <CollapsibleBody>
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