import { useListCollection } from '@ark-ui/react/collection';
import { Listbox, ListboxContent, ListboxEmpty, ListboxInput, ListboxItem, ListboxItemIndicator, ListboxItemText, ListboxLabel } from '@moduix/react/listbox';
import styles from '@/components/examples/listbox/listbox-standalone-filter-input.module.css';

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
      <ListboxLabel>Select framework</ListboxLabel>
      <ListboxInput
        placeholder="Filter frameworks"
        onChange={(event) => filter(event.target.value)}
      />
      <ListboxContent>
        {collection.items.map((item) => (
          <ListboxItem key={item.value} item={item}>
            <ListboxItemText>{item.label}</ListboxItemText>
            <ListboxItemIndicator />
          </ListboxItem>
        ))}
        <ListboxEmpty>No frameworks found</ListboxEmpty>
      </ListboxContent>
    </Listbox>
  );
}
