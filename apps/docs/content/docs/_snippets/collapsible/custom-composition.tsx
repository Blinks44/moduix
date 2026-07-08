//#region demo
import { ChevronDownIcon, Collapsible } from '@moduix/react';

const recoveryKeys = ['alien-bean-pasta', 'wild-irish-burrito', 'horse-battery-staple'];

export function CustomCompositionCollapsibleDemo() {
  return (
    <Collapsible className="collapsible-root">
      <Collapsible.Trigger asChild>
        <button type="button" className="collapsible-custom-trigger">
          Styled recovery keys
          <Collapsible.Indicator className="collapsible-custom-indicator">
            <ChevronDownIcon />
          </Collapsible.Indicator>
        </button>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Collapsible.Body className="collapsible-custom-content-body">
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
//#endregion