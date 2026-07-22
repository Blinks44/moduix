import { createListCollection } from '@ark-ui/react/collection';
import { Button, Listbox, useListbox } from '@moduix/react';
import styles from '@/components/examples/listbox.module.css';

const priorities = createListCollection({
  items: [
    {
      label: 'Low',
      value: 'low',
    },
    {
      label: 'Medium',
      value: 'medium',
    },
    {
      label: 'High',
      value: 'high',
    },
    {
      label: 'Critical',
      value: 'critical',
    },
  ],
});

export default function RootProviderListboxDemo() {
  const listbox = useListbox({
    collection: priorities,
  });
  return (
    <>
      <Button onClick={() => listbox.setValue(['high'])}>Set to high</Button>
      <Listbox.RootProvider value={listbox} className={styles.root}>
        <Listbox.Label>Select priority</Listbox.Label>
        <Listbox.Content>
          {priorities.items.map((item) => (
            <Listbox.Item key={item.value} item={item}>
              <Listbox.ItemText>{item.label}</Listbox.ItemText>
              <Listbox.ItemIndicator />
            </Listbox.Item>
          ))}
        </Listbox.Content>
      </Listbox.RootProvider>
    </>
  );
}