import { Collapsible } from '@moduix/react';

export default function PartialWidthCollapsibleDemo() {
  return (
    <Collapsible collapsedWidth="8rem" style={{ width: '18rem' }}>
      <Collapsible.Trigger>
        Read details
        <Collapsible.Indicator />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Collapsible.Body>
          Additional account-recovery details stay partly visible while this disclosure is closed.
        </Collapsible.Body>
      </Collapsible.Content>
    </Collapsible>
  );
}