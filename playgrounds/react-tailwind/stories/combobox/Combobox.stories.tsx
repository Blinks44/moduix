import { createListCollection, useListCollection } from '@ark-ui/react/collection';
import { useFilter } from '@ark-ui/react/locale';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useMemo, useState } from 'react';
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

const meta = {
  title: 'Components/Combobox',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const tagsClassName = 'flex min-h-6 flex-wrap gap-1';
const tagClassName = 'inline-flex items-center rounded-sm bg-muted px-2 py-1 text-xs';
const tagPlaceholderClassName =
  'inline-flex items-center rounded-sm px-2 py-1 text-xs text-muted-foreground';
const providerLayoutClassName = 'flex items-start gap-4';

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

function ComboboxPopup({ items }: { items: Array<{ label: string; value: string }> }) {
  return (
    <ComboboxPositioner>
      <ComboboxContent>
        <ComboboxEmpty>No options found.</ComboboxEmpty>
        <ComboboxList>
          {items.map((item) => (
            <ComboboxOption key={item.value} item={item}>
              {item.label}
            </ComboboxOption>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </ComboboxPositioner>
  );
}

function BasicStory() {
  const { contains } = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({ initialItems: fruits, filter: contains });

  return (
    <Combobox collection={collection} onInputValueChange={(details) => filter(details.inputValue)}>
      <ComboboxLabel>Choose fruit</ComboboxLabel>
      <ComboboxControl>
        <ComboboxInput placeholder="e.g. Mango" />
        <ComboboxClearTrigger aria-label="Clear selection" />
        <ComboboxTrigger aria-label="Open options" />
      </ComboboxControl>
      <ComboboxPopup items={collection.items} />
    </Combobox>
  );
}

function ControlledStory() {
  const { contains } = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({ initialItems: fruits, filter: contains });
  const [value, setValue] = useState<string[]>(['mango']);

  return (
    <Combobox
      collection={collection}
      value={value}
      onInputValueChange={(details) => filter(details.inputValue)}
      onValueChange={(details) => setValue(details.value)}
    >
      <ComboboxLabel>Choose fruit</ComboboxLabel>
      <ComboboxControl>
        <ComboboxInput />
        <ComboboxClearTrigger aria-label="Clear selection" />
        <ComboboxTrigger aria-label="Open options" />
      </ComboboxControl>
      <ComboboxPopup items={collection.items} />
    </Combobox>
  );
}

function GroupedStory() {
  const { contains } = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({
    initialItems: [
      { label: 'Canada', value: 'ca', continent: 'North America' },
      { label: 'United States', value: 'us', continent: 'North America' },
      { label: 'Germany', value: 'de', continent: 'Europe' },
      { label: 'France', value: 'fr', continent: 'Europe' },
      { label: 'Japan', value: 'jp', continent: 'Asia' },
      { label: 'South Korea', value: 'kr', continent: 'Asia' },
    ],
    filter: contains,
    groupBy: (item) => item.continent,
  });

  return (
    <Combobox collection={collection} onInputValueChange={(details) => filter(details.inputValue)}>
      <ComboboxLabel>Country</ComboboxLabel>
      <ComboboxControl>
        <ComboboxInput placeholder="e.g. Canada" />
        <ComboboxClearTrigger aria-label="Clear selection" />
        <ComboboxTrigger aria-label="Open options" />
      </ComboboxControl>
      <ComboboxPositioner>
        <ComboboxContent>
          <ComboboxEmpty>No countries found.</ComboboxEmpty>
          {collection.group().map(([continent, items]) => (
            <ComboboxItemGroup key={continent}>
              <ComboboxItemGroupLabel>{continent}</ComboboxItemGroupLabel>
              {items.map((item) => (
                <ComboboxOption key={item.value} item={item}>
                  {item.label}
                </ComboboxOption>
              ))}
            </ComboboxItemGroup>
          ))}
        </ComboboxContent>
      </ComboboxPositioner>
    </Combobox>
  );
}

function MultipleStory() {
  const { contains } = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({ initialItems: fruits, filter: contains });
  const [value, setValue] = useState<string[]>([]);
  const selectedItems = fruits.filter((item) => value.includes(item.value));

  return (
    <Combobox
      collection={collection}
      value={value}
      onValueChange={(details) => setValue(details.value)}
      onInputValueChange={(details) => filter(details.inputValue)}
      multiple
    >
      <ComboboxLabel>Fruits</ComboboxLabel>
      <div className={tagsClassName}>
        {selectedItems.length === 0 ? (
          <span className={tagPlaceholderClassName}>None selected</span>
        ) : null}
        {selectedItems.map((item) => (
          <span key={item.value} className={tagClassName}>
            {item.label}
          </span>
        ))}
      </div>
      <ComboboxControl>
        <ComboboxInput placeholder="Search fruits" />
        <ComboboxTrigger aria-label="Open options" />
      </ComboboxControl>
      <ComboboxPopup items={collection.items} />
    </Combobox>
  );
}

function AsyncSearchStory() {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([] as typeof fruits);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!inputValue) {
      setItems([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timeout = window.setTimeout(() => {
      setItems(
        fruits.filter((item) => item.label.toLowerCase().includes(inputValue.toLowerCase())),
      );
      setLoading(false);
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [inputValue]);

  const collection = useMemo(() => createListCollection({ items }), [items]);

  return (
    <Combobox
      collection={collection}
      inputValue={inputValue}
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
          {!inputValue ? <ComboboxStatus>Start typing to search…</ComboboxStatus> : null}
          {loading ? <ComboboxStatus>Searching…</ComboboxStatus> : null}
          {!loading && inputValue ? <ComboboxEmpty>No options found.</ComboboxEmpty> : null}
          <ComboboxList>
            {collection.items.map((item) => (
              <ComboboxOption key={item.value} item={item}>
                {item.label}
              </ComboboxOption>
            ))}
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
    <div className={providerLayoutClassName}>
      <button type="button" onClick={() => combobox.focus()}>
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