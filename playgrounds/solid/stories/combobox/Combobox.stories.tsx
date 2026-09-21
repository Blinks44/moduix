import { createListCollection, useListCollection } from '@ark-ui/solid/collection';
import { useFilter, type UseFilterReturn } from '@ark-ui/solid/locale';
import { createEffect, createMemo, createSignal, For, onCleanup, Show } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import {
  Combobox,
  useCombobox,
  ComboboxClearTrigger,
  ComboboxContent,
  ComboboxControl,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItemGroup,
  ComboboxItemGroupLabel,
  ComboboxLabel,
  ComboboxList,
  ComboboxOption,
  ComboboxPositioner,
  ComboboxRootProvider,
  ComboboxStatus,
  ComboboxTrigger,
} from '@/components/combobox/Combobox';
import styles from './Combobox.stories.module.css';

const fruits = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Grape', value: 'grape' },
  { label: 'Kiwi', value: 'kiwi' },
  { label: 'Mango', value: 'mango' },
  { label: 'Orange', value: 'orange' },
  { label: 'Pineapple', value: 'pineapple' },
  { label: 'Strawberry', value: 'strawberry' },
];

const meta = {
  title: 'Components/Combobox',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<Meta<typeof Combobox>>;

function createFilter(filterOptions: UseFilterReturn) {
  return (itemText: string, filterText: string) => filterOptions().contains(itemText, filterText);
}

function ComboboxPopup(props: { items: readonly { label: string; value: string }[] }) {
  return (
    <ComboboxPositioner>
      <ComboboxContent>
        <ComboboxEmpty>No options found.</ComboboxEmpty>
        <ComboboxList>
          <For each={props.items}>
            {(item) => <ComboboxOption item={item}>{item.label}</ComboboxOption>}
          </For>
        </ComboboxList>
      </ComboboxContent>
    </ComboboxPositioner>
  );
}

function BasicStory() {
  const filterOptions = useFilter({ sensitivity: 'base' });
  const collectionState = useListCollection({
    initialItems: fruits,
    filter: createFilter(filterOptions),
  });

  return (
    <Combobox
      collection={collectionState.collection()}
      onInputValueChange={(details) => collectionState.filter(details.inputValue)}
    >
      <ComboboxLabel>Choose fruit</ComboboxLabel>
      <ComboboxControl>
        <ComboboxInput placeholder="e.g. Mango" />
        <ComboboxClearTrigger aria-label="Clear selection" />
        <ComboboxTrigger aria-label="Open options" />
      </ComboboxControl>
      <ComboboxPopup items={collectionState.collection().items} />
    </Combobox>
  );
}

function ControlledStory() {
  const filterOptions = useFilter({ sensitivity: 'base' });
  const collectionState = useListCollection({
    initialItems: fruits,
    filter: createFilter(filterOptions),
  });
  const [value, setValue] = createSignal<string[]>(['mango']);

  return (
    <Combobox
      collection={collectionState.collection()}
      value={value()}
      onInputValueChange={(details) => collectionState.filter(details.inputValue)}
      onValueChange={(details) => setValue(details.value)}
    >
      <ComboboxLabel>Choose fruit</ComboboxLabel>
      <ComboboxControl>
        <ComboboxInput />
        <ComboboxClearTrigger aria-label="Clear selection" />
        <ComboboxTrigger aria-label="Open options" />
      </ComboboxControl>
      <ComboboxPopup items={collectionState.collection().items} />
    </Combobox>
  );
}

function GroupedStory() {
  const filterOptions = useFilter({ sensitivity: 'base' });
  const collectionState = useListCollection({
    initialItems: [
      { label: 'Canada', value: 'ca', continent: 'North America' },
      { label: 'United States', value: 'us', continent: 'North America' },
      { label: 'Germany', value: 'de', continent: 'Europe' },
      { label: 'France', value: 'fr', continent: 'Europe' },
      { label: 'Japan', value: 'jp', continent: 'Asia' },
      { label: 'South Korea', value: 'kr', continent: 'Asia' },
    ],
    filter: createFilter(filterOptions),
    groupBy: (item) => item.continent,
  });

  return (
    <Combobox
      collection={collectionState.collection()}
      onInputValueChange={(details) => collectionState.filter(details.inputValue)}
    >
      <ComboboxLabel>Country</ComboboxLabel>
      <ComboboxControl>
        <ComboboxInput placeholder="e.g. Canada" />
        <ComboboxClearTrigger aria-label="Clear selection" />
        <ComboboxTrigger aria-label="Open options" />
      </ComboboxControl>
      <ComboboxPositioner>
        <ComboboxContent>
          <ComboboxEmpty>No countries found.</ComboboxEmpty>
          <For each={collectionState.collection().group()}>
            {([continent, items]) => (
              <ComboboxItemGroup>
                <ComboboxItemGroupLabel>{continent}</ComboboxItemGroupLabel>
                <For each={items}>
                  {(item) => <ComboboxOption item={item}>{item.label}</ComboboxOption>}
                </For>
              </ComboboxItemGroup>
            )}
          </For>
        </ComboboxContent>
      </ComboboxPositioner>
    </Combobox>
  );
}

function MultipleStory() {
  const filterOptions = useFilter({ sensitivity: 'base' });
  const collectionState = useListCollection({
    initialItems: fruits,
    filter: createFilter(filterOptions),
  });
  const [value, setValue] = createSignal<string[]>([]);
  const selectedItems = createMemo(() => fruits.filter((item) => value().includes(item.value)));

  return (
    <Combobox
      collection={collectionState.collection()}
      value={value()}
      onValueChange={(details) => setValue(details.value)}
      onInputValueChange={(details) => collectionState.filter(details.inputValue)}
      multiple
    >
      <ComboboxLabel>Fruits</ComboboxLabel>
      <div class={styles.tags}>
        <Show
          when={selectedItems().length > 0}
          fallback={<span class={styles.tagPlaceholder}>None selected</span>}
        >
          <For each={selectedItems()}>{(item) => <span class={styles.tag}>{item.label}</span>}</For>
        </Show>
      </div>
      <ComboboxControl>
        <ComboboxInput placeholder="Search fruits" />
        <ComboboxTrigger aria-label="Open options" />
      </ComboboxControl>
      <ComboboxPopup items={collectionState.collection().items} />
    </Combobox>
  );
}

function AsyncSearchStory() {
  const [inputValue, setInputValue] = createSignal('');
  const [items, setItems] = createSignal<typeof fruits>([]);
  const [loading, setLoading] = createSignal(false);

  createEffect(() => {
    const value = inputValue();

    if (!value) {
      setItems([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timeout = window.setTimeout(() => {
      setItems(fruits.filter((item) => item.label.toLowerCase().includes(value.toLowerCase())));
      setLoading(false);
    }, 300);

    onCleanup(() => window.clearTimeout(timeout));
  });

  const collectionState = useListCollection({ initialItems: [] as typeof fruits });

  createEffect(() => {
    collectionState.set(items());
  });

  return (
    <Combobox
      collection={collectionState.collection()}
      inputValue={inputValue()}
      onInputValueChange={(details) => setInputValue(details.inputValue)}
    >
      <ComboboxLabel>Async-style search</ComboboxLabel>
      <ComboboxControl>
        <ComboboxInput placeholder="Start typing" />
        <ComboboxClearTrigger aria-label="Clear search" />
        <ComboboxTrigger aria-label="Open options" />
      </ComboboxControl>
      <ComboboxPositioner>
        <ComboboxContent>
          <Show when={!inputValue()}>
            <ComboboxStatus>Start typing to search…</ComboboxStatus>
          </Show>
          <Show when={loading()}>
            <ComboboxStatus>Searching…</ComboboxStatus>
          </Show>
          <Show when={!loading() && inputValue()}>
            <ComboboxEmpty>No options found.</ComboboxEmpty>
          </Show>
          <ComboboxList>
            <For each={collectionState.collection().items}>
              {(item) => <ComboboxOption item={item}>{item.label}</ComboboxOption>}
            </For>
          </ComboboxList>
        </ComboboxContent>
      </ComboboxPositioner>
    </Combobox>
  );
}

const jobTitles = createListCollection({
  items: [
    { label: 'Designer', value: 'designer' },
    { label: 'Developer', value: 'developer' },
    { label: 'Product Manager', value: 'product-manager' },
  ],
});

function RootProviderStory() {
  const combobox = useCombobox({ collection: jobTitles });

  return (
    <div class={styles.providerLayout}>
      <button type="button" onClick={() => combobox().focus()}>
        Focus combobox
      </button>
      <ComboboxRootProvider value={combobox}>
        <ComboboxLabel>Job title</ComboboxLabel>
        <ComboboxControl>
          <ComboboxInput />
          <ComboboxClearTrigger aria-label="Clear selection" />
          <ComboboxTrigger aria-label="Open options" />
        </ComboboxControl>
        <ComboboxPopup items={jobTitles.items} />
      </ComboboxRootProvider>
    </div>
  );
}

export const Basic: Story = { render: () => <BasicStory /> };
export const Controlled: Story = { render: () => <ControlledStory /> };
export const Grouped: Story = { render: () => <GroupedStory /> };
export const Multiple: Story = { render: () => <MultipleStory /> };
export const AsyncSearch: Story = { render: () => <AsyncSearchStory /> };
export const RootProvider: Story = { render: () => <RootProviderStory /> };