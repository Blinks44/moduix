import { useListCollection } from '@ark-ui/solid/collection';
import { Listbox, ListboxContent, ListboxEmpty, ListboxInput, ListboxItem, ListboxItemIndicator, ListboxItemText, ListboxLabel } from '@moduix/solid/listbox';
import { For } from 'solid-js';
import styles from '@/components/examples/listbox/listbox-standalone-filter-input.module.css';

const frameworks = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Solid', value: 'solid' },
  { label: 'Next.js', value: 'nextjs' },
];

export default function StandaloneFilterInputListboxDemo() {
  const { collection, filter } = useListCollection({
    initialItems: frameworks,
    filter: (itemText, filterText) => itemText.toLowerCase().includes(filterText.toLowerCase()),
  });

  return (
    <Listbox collection={collection()} class={styles.root} typeahead={false}>
      <ListboxLabel>Select framework</ListboxLabel>
      <ListboxInput
        placeholder="Filter frameworks"
        onInput={(event) => filter(event.currentTarget.value)}
      />
      <ListboxContent>
        <For each={collection().items}>
          {(item) => (
            <ListboxItem item={item}>
              <ListboxItemText>{item.label}</ListboxItemText>
              <ListboxItemIndicator />
            </ListboxItem>
          )}
        </For>
        <ListboxEmpty>No frameworks found</ListboxEmpty>
      </ListboxContent>
    </Listbox>
  );
}
