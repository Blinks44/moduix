import { useListCollection } from '@ark-ui/solid/collection';
import { Listbox } from '@moduix/solid/listbox';
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
      <Listbox.Label>Select framework</Listbox.Label>
      <Listbox.Input
        placeholder="Filter frameworks"
        onInput={(event) => filter(event.currentTarget.value)}
      />
      <Listbox.Content>
        <For each={collection().items}>
          {(item) => (
            <Listbox.Item item={item}>
              <Listbox.ItemText>{item.label}</Listbox.ItemText>
              <Listbox.ItemIndicator />
            </Listbox.Item>
          )}
        </For>
        <Listbox.Empty>No frameworks found</Listbox.Empty>
      </Listbox.Content>
    </Listbox>
  );
}