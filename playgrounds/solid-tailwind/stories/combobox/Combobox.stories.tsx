import { createListCollection, useListCollection } from '@ark-ui/solid/collection';
import { useFilter, type UseFilterReturn } from '@ark-ui/solid/locale';
import { createEffect, createMemo, createSignal, For, onCleanup, Show } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Combobox, useCombobox } from '@/components/combobox/Combobox';

const meta = {
  title: 'Components/Combobox',
  component: Combobox,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Combobox>;

export default meta;

type Story = StoryObj<typeof meta>;

const tagsClass = 'flex min-h-6 flex-wrap gap-1';
const tagClass = 'inline-flex items-center rounded-sm bg-muted px-2 py-1 text-xs';
const tagPlaceholderClass =
  'inline-flex items-center rounded-sm px-2 py-1 text-xs text-muted-foreground';
const providerLayoutClass = 'flex items-start gap-4';

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

function createFilter(filterOptions: UseFilterReturn) {
  return (itemText: string, filterText: string) => filterOptions().contains(itemText, filterText);
}

function ComboboxPopup(props: { items: readonly { label: string; value: string }[] }) {
  return (
    <Combobox.Positioner>
      <Combobox.Content>
        <Combobox.Empty>No options found.</Combobox.Empty>
        <Combobox.List>
          <For each={props.items}>
            {(item) => <Combobox.Option item={item}>{item.label}</Combobox.Option>}
          </For>
        </Combobox.List>
      </Combobox.Content>
    </Combobox.Positioner>
  );
}

function BasicStory() {
  const filterOptions = useFilter({ sensitivity: 'base' });
  const collectionState = useListCollection({
    initialItems: fruits,
    filter: createFilter(filterOptions),
  });

  return (
    <Combobox.Root
      collection={collectionState.collection()}
      onInputValueChange={(details) => collectionState.filter(details.inputValue)}
    >
      <Combobox.Label>Choose fruit</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="e.g. Mango" />
        <Combobox.ClearTrigger aria-label="Clear selection" />
        <Combobox.Trigger aria-label="Open options" />
      </Combobox.Control>
      <ComboboxPopup items={collectionState.collection().items} />
    </Combobox.Root>
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
    <Combobox.Root
      collection={collectionState.collection()}
      value={value()}
      onInputValueChange={(details) => collectionState.filter(details.inputValue)}
      onValueChange={(details) => setValue(details.value)}
    >
      <Combobox.Label>Choose fruit</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input />
        <Combobox.ClearTrigger aria-label="Clear selection" />
        <Combobox.Trigger aria-label="Open options" />
      </Combobox.Control>
      <ComboboxPopup items={collectionState.collection().items} />
    </Combobox.Root>
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
    <Combobox.Root
      collection={collectionState.collection()}
      onInputValueChange={(details) => collectionState.filter(details.inputValue)}
    >
      <Combobox.Label>Country</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="e.g. Canada" />
        <Combobox.ClearTrigger aria-label="Clear selection" />
        <Combobox.Trigger aria-label="Open options" />
      </Combobox.Control>
      <Combobox.Positioner>
        <Combobox.Content>
          <Combobox.Empty>No countries found.</Combobox.Empty>
          <For each={collectionState.collection().group()}>
            {([continent, items]) => (
              <Combobox.ItemGroup>
                <Combobox.ItemGroupLabel>{continent}</Combobox.ItemGroupLabel>
                <For each={items}>
                  {(item) => <Combobox.Option item={item}>{item.label}</Combobox.Option>}
                </For>
              </Combobox.ItemGroup>
            )}
          </For>
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox.Root>
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
    <Combobox.Root
      collection={collectionState.collection()}
      value={value()}
      onValueChange={(details) => setValue(details.value)}
      onInputValueChange={(details) => collectionState.filter(details.inputValue)}
      multiple
    >
      <Combobox.Label>Fruits</Combobox.Label>
      <div class={tagsClass}>
        <Show
          when={selectedItems().length > 0}
          fallback={<span class={tagPlaceholderClass}>None selected</span>}
        >
          <For each={selectedItems()}>{(item) => <span class={tagClass}>{item.label}</span>}</For>
        </Show>
      </div>
      <Combobox.Control>
        <Combobox.Input placeholder="Search fruits" />
        <Combobox.Trigger aria-label="Open options" />
      </Combobox.Control>
      <ComboboxPopup items={collectionState.collection().items} />
    </Combobox.Root>
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
    <Combobox.Root
      collection={collectionState.collection()}
      inputValue={inputValue()}
      onInputValueChange={(details) => setInputValue(details.inputValue)}
    >
      <Combobox.Label>Async-style search</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="Start typing" />
        <Combobox.ClearTrigger aria-label="Clear search" />
        <Combobox.Trigger aria-label="Open options" />
      </Combobox.Control>
      <Combobox.Positioner>
        <Combobox.Content>
          <Show when={!inputValue()}>
            <Combobox.Status>Start typing to search…</Combobox.Status>
          </Show>
          <Show when={loading()}>
            <Combobox.Status>Searching…</Combobox.Status>
          </Show>
          <Show when={!loading() && inputValue()}>
            <Combobox.Empty>No options found.</Combobox.Empty>
          </Show>
          <Combobox.List>
            <For each={collectionState.collection().items}>
              {(item) => <Combobox.Option item={item}>{item.label}</Combobox.Option>}
            </For>
          </Combobox.List>
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox.Root>
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
    <div class={providerLayoutClass}>
      <button type="button" onClick={() => combobox().focus()}>
        Focus combobox
      </button>
      <Combobox.RootProvider value={combobox}>
        <Combobox.Label>Job title</Combobox.Label>
        <Combobox.Control>
          <Combobox.Input />
          <Combobox.ClearTrigger aria-label="Clear selection" />
          <Combobox.Trigger aria-label="Open options" />
        </Combobox.Control>
        <ComboboxPopup items={jobTitles.items} />
      </Combobox.RootProvider>
    </div>
  );
}

export const Basic: Story = { render: () => <BasicStory /> };
export const Controlled: Story = { render: () => <ControlledStory /> };
export const Grouped: Story = { render: () => <GroupedStory /> };
export const Multiple: Story = { render: () => <MultipleStory /> };
export const AsyncSearch: Story = { render: () => <AsyncSearchStory /> };
export const RootProvider: Story = { render: () => <RootProviderStory /> };