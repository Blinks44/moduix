import { Collapsible, useCollapsible } from '@moduix/solid/collapsible';
import styles from '@/components/examples/collapsible/collapsible-root-provider.module.css';

const recoveryKeys = ['alien-bean-pasta', 'wild-irish-burrito', 'horse-battery-staple'];

export default function RootProviderCollapsibleDemo() {
  const collapsible = useCollapsible();

  return (
    <div class={styles.layout}>
      <Collapsible.RootProvider class={styles.root} value={collapsible}>
        <Collapsible.Trigger>
          Recovery keys
          <Collapsible.Indicator />
        </Collapsible.Trigger>
        <Collapsible.Content>
          <Collapsible.Body>
            <ul class={styles.keysList}>
              {recoveryKeys.map((key) => (
                <li>{key}</li>
              ))}
            </ul>
          </Collapsible.Body>
        </Collapsible.Content>
      </Collapsible.RootProvider>
      <output>
        State: open {String(collapsible().open)}, visible {String(collapsible().visible)}
      </output>
    </div>
  );
}