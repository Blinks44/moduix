import {
  CollapsibleBody,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleRootProvider,
  CollapsibleTrigger,
  useCollapsible,
} from '@moduix/solid/collapsible';
import styles from '@/components/examples/collapsible/collapsible-root-provider.module.css';

const recoveryKeys = ['alien-bean-pasta', 'wild-irish-burrito', 'horse-battery-staple'];

export default function RootProviderCollapsibleDemo() {
  const collapsible = useCollapsible();

  return (
    <div class={styles.layout}>
      <CollapsibleRootProvider class={styles.root} value={collapsible}>
        <CollapsibleTrigger>
          Recovery keys
          <CollapsibleIndicator />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CollapsibleBody>
            <ul class={styles.keysList}>
              {recoveryKeys.map((key) => (
                <li>{key}</li>
              ))}
            </ul>
          </CollapsibleBody>
        </CollapsibleContent>
      </CollapsibleRootProvider>
      <output>
        State: open {String(collapsible().open)}, visible {String(collapsible().visible)}
      </output>
    </div>
  );
}