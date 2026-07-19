//#region demo
import { Collapsible, useCollapsible } from '@moduix/react';

const recoveryKeys = ['alien-bean-pasta', 'wild-irish-burrito', 'horse-battery-staple'];

export function RootProviderCollapsibleDemo() {
  const collapsible = useCollapsible();

  return (
    <div className="collapsible-provider-layout">
      <output>
        open: {String(collapsible.open)}, visible: {String(collapsible.visible)}
      </output>
      <Collapsible.RootProvider value={collapsible} className="collapsible-root">
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
      </Collapsible.RootProvider>
    </div>
  );
}
//#endregion