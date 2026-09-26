import {
  Collapsible,
  CollapsibleBody,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleTrigger,
} from '@moduix/solid/collapsible';
import styles from '@/components/examples/collapsible/collapsible-nested.module.css';

const recoveryKeys = ['alien-bean-pasta', 'wild-irish-burrito', 'horse-battery-staple'];

export default function NestedCollapsibleDemo() {
  return (
    <Collapsible class={styles.root}>
      <CollapsibleTrigger>
        Account security
        <CollapsibleIndicator />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <CollapsibleBody class={styles.nestedContent}>
          <p>Security options for this account.</p>
          <Collapsible class={styles.nestedRoot}>
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
        </CollapsibleBody>
      </CollapsibleContent>
    </Collapsible>
  );
}