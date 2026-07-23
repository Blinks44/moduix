import { Collapsible } from '@moduix/react';

const recoveryKeys = ['alien-bean-pasta', 'wild-irish-burrito', 'horse-battery-staple'];

export default function DisabledCollapsibleDemo() {
  return (
    <Collapsible disabled>
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
  );
}