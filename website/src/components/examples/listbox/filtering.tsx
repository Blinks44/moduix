import { useListCollection } from '@ark-ui/react/collection';
import {
  Listbox,
  ListboxClearTrigger,
  ListboxContent,
  ListboxEmpty,
  ListboxFilter,
  ListboxInput,
  ListboxItem,
  ListboxItemIndicator,
  ListboxItemText,
  ListboxLabel,
} from '@moduix/react/listbox';
import { useState } from 'react';
import styles from '@/components/examples/listbox/listbox-filtering.module.css';

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
  {
    label: 'Nuxt.js',
    value: 'nuxtjs',
  },
  {
    label: 'Remix',
    value: 'remix',
  },
  {
    label: 'Gatsby',
    value: 'gatsby',
  },
  {
    label: 'Preact',
    value: 'preact',
  },
];

export default function FilteringListboxDemo() {
  const [filterText, setFilterText] = useState('');
  const { collection, filter } = useListCollection({
    initialItems: frameworks,
    filter: (itemText, filterText) => itemText.toLowerCase().includes(filterText.toLowerCase()),
  });
  return (
    <Listbox collection={collection} className={styles.root} typeahead={false}>
      <ListboxLabel>Select framework</ListboxLabel>
      <ListboxFilter>
        <ListboxInput
          placeholder="Search frameworks..."
          value={filterText}
          onChange={(event) => {
            setFilterText(event.target.value);
            filter(event.target.value);
          }}
        />
        {filterText ? (
          <ListboxClearTrigger
            onClick={() => {
              setFilterText('');
              filter('');
            }}
          />
        ) : null}
      </ListboxFilter>
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