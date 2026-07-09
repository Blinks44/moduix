//#region demo
import { Collapsible } from '@moduix/react';

const recoveryKeys = ['alien-bean-pasta', 'wild-irish-burrito', 'horse-battery-staple'];

export function NestedCollapsibleDemo() {
  return (
    <Collapsible className="collapsible-root">
      <Collapsible.Trigger>
        Account security
        <Collapsible.Indicator />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Collapsible.Body className="collapsible-nested-content">
          <p>Security options for this account.</p>
          <Collapsible className="collapsible-nested-root">
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
        </Collapsible.Body>
      </Collapsible.Content>
    </Collapsible>
  );
}
//#endregion