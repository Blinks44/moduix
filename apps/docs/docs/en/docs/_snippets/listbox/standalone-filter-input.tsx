import { useListCollection } from '@ark-ui/react/collection';
import { Listbox } from '@moduix/react';
import styles from '@/components/examples/listbox.module.css';

const frameworks = [
  {
    label: 'React',
    value: 'react',
  },
  {
    label: 'Vue',
    value: 'vue',
  },
  {
    label: 'Angular',
    value: 'angular',
  },
  {
    label: 'Svelte',
    value: 'svelte',
  },
  {
    label: 'Solid',
    value: 'solid',
  },
  {
    label: 'Next.js',
    value: 'nextjs',
  },
];

export default function StandaloneFilterInputListboxDemo() {
  const { collection, filter } = useListCollection({
    initialItems: frameworks,
    filter: (itemText, filterText) => itemText.toLowerCase().includes(filterText.toLowerCase()),
  });

  return (
    <Listbox collection={collection} className={styles.root} typeahead={false}>
      <Listbox.Label>Select framework</Listbox.Label>
      <Listbox.Input
        placeholder="Filter frameworks"
        onChange={(event) => filter(event.target.value)}
      />
      <Listbox.Content>
        {collection.items.map((item) => (
          <Listbox.Item key={item.value} item={item}>
            <Listbox.ItemText>{item.label}</Listbox.ItemText>
            <Listbox.ItemIndicator />
          </Listbox.Item>
        ))}
        <Listbox.Empty>No frameworks found</Listbox.Empty>
      </Listbox.Content>
    </Listbox>
  );
}