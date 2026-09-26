import { Button } from '@moduix/react/button';
import {
  Collapsible,
  CollapsibleBody,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleTrigger,
  useCollapsibleContext,
} from '@moduix/react/collapsible';
import styles from '@/components/examples/collapsible/collapsible-context.module.css';

function CloseDetailsButton() {
  const collapsible = useCollapsibleContext();

  return (
    <Button size="sm" type="button" onClick={() => collapsible.setOpen(false)}>
      Close details
    </Button>
  );
}

export default function ContextCollapsibleDemo() {
  return (
    <Collapsible className={styles.root} defaultOpen>
      <CollapsibleTrigger>
        Account details
        <CollapsibleIndicator />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <CollapsibleBody>
          Use the context from a descendant when that descendant needs to close the disclosure.
          <CloseDetailsButton />
        </CollapsibleBody>
      </CollapsibleContent>
    </Collapsible>
  );
}