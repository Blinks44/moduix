import {
  CollapsibleBody,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleRootProvider,
  CollapsibleTrigger,
  useCollapsible,
} from '@moduix/react/collapsible';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/collapsible/collapsible-root-provider.module.css';

const recoveryKeys = ['alien-bean-pasta', 'wild-irish-burrito', 'horse-battery-staple'];

export default function RootProviderCollapsibleDemo() {
  const collapsible = useCollapsible();

  return (
    <div className={styles.layout}>
      <CollapsibleRootProvider className={styles.root} value={collapsible}>
        <CollapsibleTrigger>
          Recovery keys
          <CollapsibleIndicator />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CollapsibleBody>
            <ul className={styles.keysList}>
              {recoveryKeys.map((key) => (
                <li key={key}>{key}</li>
              ))}
            </ul>
          </CollapsibleBody>
        </CollapsibleContent>
      </CollapsibleRootProvider>
      <PreviewMeta>
        <output>
          State: open {String(collapsible.open)}, visible {String(collapsible.visible)}
        </output>
      </PreviewMeta>
    </div>
  );
}