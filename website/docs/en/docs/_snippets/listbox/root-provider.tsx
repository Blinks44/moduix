import { createListCollection } from '@ark-ui/react/collection';
import { Button } from '@moduix/react/button';
import { Listbox, useListbox } from '@moduix/react/listbox';
import { PreviewMeta } from '@/components/mdx/Components';
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
    <div style={{ display: 'grid', gap: 'var(--moduix-spacing-3)' }}>
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
      <PreviewMeta style={{ placeSelf: 'center' }}>
        <output>Selected: {listbox.value[0] ?? 'none'}</output>
        <Button onClick={() => listbox.setValue(['high'])}>Set to high</Button>
      </PreviewMeta>
    </div>
  );
}