//#region demo
import { Collapsible } from '@moduix/react';

const recoveryKeys = ['alien-bean-pasta', 'wild-irish-burrito', 'horse-battery-staple'];

export function LazyMountCollapsibleDemo() {
  return (
    <Collapsible className="collapsible-root" lazyMount unmountOnExit>
      <Collapsible.Trigger>
        Recovery keys
        <Collapsible.Indicator />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <div className="collapsible-content-body">
          <ul className="collapsible-keys-list">
            {recoveryKeys.map((key) => (
              <li key={key}>{key}</li>
            ))}
          </ul>
        </div>
      </Collapsible.Content>
    </Collapsible>
  );
}
//#endregion