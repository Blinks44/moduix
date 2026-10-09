import { useListCollection } from '@ark-ui/solid/collection';
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
} from '@moduix/solid/listbox';
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
      <ListboxLabel>Select framework</ListboxLabel>
      <ListboxFilter>
        <ListboxInput
          placeholder="Search frameworks..."
          value={filterText()}
          onInput={(event) => updateFilter(event.currentTarget.value)}
        />
        <Show when={filterText()}>
          <ListboxClearTrigger onClick={() => updateFilter('')} />
        </Show>
      </ListboxFilter>
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