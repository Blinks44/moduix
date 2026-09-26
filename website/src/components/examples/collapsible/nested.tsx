import {
  Collapsible,
  CollapsibleBody,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleTrigger,
} from '@moduix/react/collapsible';
import styles from '@/components/examples/collapsible/collapsible-nested.module.css';

const recoveryKeys = ['alien-bean-pasta', 'wild-irish-burrito', 'horse-battery-staple'];

export default function NestedCollapsibleDemo() {
  return (
    <Collapsible className={styles.root}>
      <CollapsibleTrigger>
        Account security
        <CollapsibleIndicator />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <CollapsibleBody className={styles.nestedContent}>
          <p>Security options for this account.</p>
          <Collapsible className={styles.nestedRoot}>
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
        </CollapsibleBody>
      </CollapsibleContent>
    </Collapsible>
  );
}