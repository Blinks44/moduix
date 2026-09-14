import { useListCollection } from '@ark-ui/solid/collection';
import { Listbox } from '@moduix/solid/listbox';
import { createSignal, For, Show } from 'solid-js';
import styles from '@/components/examples/listbox/listbox-filtering.module.css';

const frameworks = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Solid', value: 'solid' },
  { label: 'Next.js', value: 'nextjs' },
  { label: 'Nuxt.js', value: 'nuxtjs' },
  { label: 'Remix', value: 'remix' },
  { label: 'Gatsby', value: 'gatsby' },
  { label: 'Preact', value: 'preact' },
];

export default function FilteringListboxDemo() {
  const [filterText, setFilterText] = createSignal('');
  const { collection, filter } = useListCollection({
    initialItems: frameworks,
    filter: (itemText, filterText) => itemText.toLowerCase().includes(filterText.toLowerCase()),
  });

  const updateFilter = (value: string) => {
    setFilterText(value);
    filter(value);
  };

  return (
    <Listbox collection={collection()} class={styles.root} typeahead={false}>
      <Listbox.Label>Select framework</Listbox.Label>
      <Listbox.Filter>
        <Listbox.Input
          placeholder="Search frameworks..."
          value={filterText()}
          onInput={(event) => updateFilter(event.currentTarget.value)}
        />
        <Show when={filterText()}>
          <Listbox.ClearTrigger onClick={() => updateFilter('')} />
        </Show>
      </Listbox.Filter>
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