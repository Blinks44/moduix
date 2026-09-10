import { List } from '@moduix/solid/list';
import styles from '@/components/examples/list/list-custom-composition.module.css';

export default function CustomCompositionListDemo() {
  return (
    <List>
      <List.Item
        asChild={(props) => (
          <li {...props()} class={styles.item}>
            Custom items can own their local styling.
          </li>
        )}
      />
      <List.Item
        asChild={(props) => (
          <li {...props()} class={styles.item}>
            List still provides its spacing and marker contract.
          </li>
        )}
      />
      <List.Item
        asChild={(props) => (
          <li {...props()} class={styles.item}>
            asChild keeps the semantic li contract for custom items.
          </li>
        )}
      />
    </List>
  );
}