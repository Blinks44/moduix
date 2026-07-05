/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { useListCollection } from '@ark-ui/react/collection';
import { Listbox } from '@moduix/react';

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

export function FilteringListboxDemo() {
  const { collection, filter } = useListCollection({
    initialItems: frameworks,
    filter: (itemText, filterText) => itemText.toLowerCase().includes(filterText.toLowerCase()),
  });
  return (
    <Listbox collection={collection} typeahead={false}>
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

//#endregion