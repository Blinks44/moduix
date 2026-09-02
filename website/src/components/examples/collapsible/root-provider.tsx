import { Collapsible, useCollapsible } from '@moduix/react/collapsible';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/collapsible/collapsible-root-provider.module.css';

const recoveryKeys = ['alien-bean-pasta', 'wild-irish-burrito', 'horse-battery-staple'];

export default function RootProviderCollapsibleDemo() {
  const collapsible = useCollapsible();

  return (
    <div className={styles.layout}>
      <Collapsible.RootProvider className={styles.root} value={collapsible}>
        <Collapsible.Trigger>
          Recovery keys
          <Collapsible.Indicator />
        </Collapsible.Trigger>
        <Collapsible.Content>
          <Collapsible.Body>
            <ul className={styles.keysList}>
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