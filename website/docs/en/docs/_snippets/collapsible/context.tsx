import { Button } from '@moduix/react/button';
import { Collapsible, useCollapsibleContext } from '@moduix/react/collapsible';

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
    <Collapsible defaultOpen>
      <Collapsible.Trigger>
        Account details
        <Collapsible.Indicator />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Collapsible.Body>
          Use the context from a descendant when that descendant needs to close the disclosure.
          <CloseDetailsButton />
        </Collapsible.Body>
      </Collapsible.Content>
    </Collapsible>
  );
}