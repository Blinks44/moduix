import { Collapsible, useCollapsible } from '@moduix/react';
import { PreviewMeta } from '@/components/mdx/Components';

const recoveryKeys = ['alien-bean-pasta', 'wild-irish-burrito', 'horse-battery-staple'];

export default function RootProviderCollapsibleDemo() {
  const collapsible = useCollapsible();

  return (
    <div className="collapsible-example-layout">
      <Collapsible.RootProvider value={collapsible}>
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
      <PreviewMeta>
        <output>
          State: open {String(collapsible.open)}, visible {String(collapsible.visible)}
        </output>
      </PreviewMeta>
    </div>
  );
}