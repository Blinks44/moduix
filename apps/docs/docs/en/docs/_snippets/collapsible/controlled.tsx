import { Collapsible } from '@moduix/react';
import { useState } from 'react';

const recoveryKeys = ['alien-bean-pasta', 'wild-irish-burrito', 'horse-battery-staple'];

export default function ControlledCollapsibleDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="collapsible-example-layout">
      <Collapsible open={open} onOpenChange={(details) => setOpen(details.open)}>
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
      </Collapsible>
      <output>State: {open ? 'open' : 'closed'}</output>
    </div>
  );
}