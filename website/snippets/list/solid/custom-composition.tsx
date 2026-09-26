import { List, ListItem } from '@moduix/solid/list';
import styles from '@/components/examples/list/list-custom-composition.module.css';

export default function CustomCompositionListDemo() {
  return (
    <List>
      <ListItem
        asChild={(props) => (
          <li {...props()} class={styles.item}>
            Custom items can own their local styling.
          </li>
        )}
      />
      <ListItem
        asChild={(props) => (
          <li {...props()} class={styles.item}>
            List still provides its spacing and marker contract.
          </li>
        )}
      />
      <ListItem
        asChild={(props) => (
          <li {...props()} class={styles.item}>
            asChild keeps the semantic li contract for custom items.
          </li>
        )}
      />
    </List>
  );
}