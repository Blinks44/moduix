import { List } from '@moduix/react/list';
import type { ComponentProps } from 'react';
import { forwardRef } from 'react';
import styles from '@/components/examples/list/list-custom-composition.module.css';

const ReleaseListItem = forwardRef<HTMLLIElement, ComponentProps<'li'>>(
  function ReleaseListItem(props, ref) {
    return <li ref={ref} {...props} />;
  },
);

export default function CustomCompositionListDemo() {
  return (
    <List>
      <List.Item asChild>
        <ReleaseListItem className={styles.item}>
          Custom items can own their local styling.
        </ReleaseListItem>
      </List.Item>
      <List.Item asChild>
        <ReleaseListItem className={styles.item}>
          List still provides its spacing and marker contract.
        </ReleaseListItem>
      </List.Item>
      <List.Item asChild>
        <ReleaseListItem className={styles.item}>
          asChild keeps the semantic li contract for custom items.
        </ReleaseListItem>
      </List.Item>
    </List>
  );
}