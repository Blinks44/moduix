import {
  Collapsible,
  CollapsibleBody,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleTrigger,
} from '@moduix/react/collapsible';
import styles from '@/components/examples/collapsible/collapsible-partial-collapse-width.module.css';

export default function PartialWidthCollapsibleDemo() {
  return (
    <Collapsible className={styles.root} collapsedWidth="8rem">
      <CollapsibleTrigger>
        Read details
        <CollapsibleIndicator />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <CollapsibleBody>
          Additional account-recovery details stay partly visible while this disclosure is closed.
        </CollapsibleBody>
      </CollapsibleContent>
    </Collapsible>
  );
}