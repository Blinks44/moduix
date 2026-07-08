//#region demo
import { Collapsible } from '@moduix/react';
import { useState } from 'react';

const recoveryKeys = ['alien-bean-pasta', 'wild-irish-burrito', 'horse-battery-staple'];

export function ControlledCollapsibleDemo() {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible
      className="collapsible-root"
      open={open}
      onOpenChange={(details) => setOpen(details.open)}
    >
      <Collapsible.Trigger>
        Recovery keys
        <Collapsible.Indicator />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Collapsible.Body>
          <ul className="collapsible-keys-list">
            {recoveryKeys.map((key) => (
              <li key={key}>{key}</li>
            ))}
          </ul>
        </Collapsible.Body>
      </Collapsible.Content>
      <span className="collapsible-state">Current state: {open ? 'open' : 'closed'}</span>
    </Collapsible>
  );
}
//#endregion