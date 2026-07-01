import type { UseComboboxContext } from '@ark-ui/react/combobox';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { createListCollection, useListCollection } from '@ark-ui/react/collection';
import { useFilter } from '@ark-ui/react/locale';
import { useMemo, useState } from 'react';
import { Combobox, useCombobox } from './Combobox';
import styles from './Combobox.stories.module.css';

const meta = {
  title: 'Components/Combobox',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

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
    <Combobox.Positioner>
      <Combobox.Content>
        <Combobox.Empty>No options found.</Combobox.Empty>
        <Combobox.List>
          {items.map((item) => (
            <Combobox.Item key={item.value} item={item}>
              <Combobox.ItemText>{item.label}</Combobox.ItemText>
              <Combobox.ItemIndicator />
            </Combobox.Item>
          ))}
        </Combobox.List>
      </Combobox.Content>
    </Combobox.Positioner>
  );
}

function BasicStory() {
  const { contains } = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({ initialItems: fruits, filter: contains });

  return (
    <Combobox.Root
      collection={collection}
      onInputValueChange={(details) => filter(details.inputValue)}
    >
      <Combobox.Label>Choose fruit</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="e.g. Mango" />
        <Combobox.ClearTrigger aria-label="Clear selection" />
        <Combobox.Trigger aria-label="Open options" />
      </Combobox.Control>
      <ComboboxPopup items={collection.items} />
    </Combobox.Root>
  );
}

function ControlledStory() {
  const { contains } = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({ initialItems: fruits, filter: contains });
  const [value, setValue] = useState<string[]>(['mango']);

  return (
    <Combobox.Root
      collection={collection}
      value={value}
      onInputValueChange={(details) => filter(details.inputValue)}
      onValueChange={(details) => setValue(details.value)}
    >
      <Combobox.Label>Choose fruit</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input />
        <Combobox.ClearTrigger aria-label="Clear selection" />
        <Combobox.Trigger aria-label="Open options" />
      </Combobox.Control>
      <ComboboxPopup items={collection.items} />
    </Combobox.Root>
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
    <Combobox.Root
      collection={collection}
      onInputValueChange={(details) => filter(details.inputValue)}
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
          {collection.group().map(([continent, items]) => (
            <Combobox.ItemGroup key={continent}>
              <Combobox.ItemGroupLabel>{continent}</Combobox.ItemGroupLabel>
              {items.map((item) => (
                <Combobox.Item key={item.value} item={item}>
                  <Combobox.ItemText>{item.label}</Combobox.ItemText>
                  <Combobox.ItemIndicator />
                </Combobox.Item>
              ))}
            </Combobox.ItemGroup>
          ))}
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox.Root>
  );
}

function MultipleStory() {
  const { contains } = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({ initialItems: fruits, filter: contains });

  return (
    <Combobox.Root
      collection={collection}
      onInputValueChange={(details) => filter(details.inputValue)}
      multiple
    >
      <Combobox.Label>Fruits</Combobox.Label>
      <Combobox.Context>
        {(context: UseComboboxContext<(typeof fruits)[number]>) => (
          <div className={styles.tags}>
            {context.selectedItems.length === 0 ? (
              <span className={styles.tagPlaceholder}>None selected</span>
            ) : null}
            {context.selectedItems.map((item) => (
              <span key={item.value} className={styles.tag}>
                {item.label}
              </span>
            ))}
          </div>
        )}
      </Combobox.Context>
      <Combobox.Control>
        <Combobox.Input placeholder="Search fruits" />
        <Combobox.Trigger aria-label="Open options" />
      </Combobox.Control>
      <ComboboxPopup items={collection.items} />
    </Combobox.Root>
  );
}

function AsyncSearchStory() {
  const [inputValue, setInputValue] = useState('');
  const items = useMemo(
    () =>
      inputValue
        ? fruits.filter((item) => item.label.toLowerCase().includes(inputValue.toLowerCase()))
        : [],
    [inputValue],
  );
  const collection = createListCollection({ items });

  return (
    <Combobox.Root
      collection={collection}
      inputValue={inputValue}
      onInputValueChange={(details) => setInputValue(details.inputValue)}
    >
      <Combobox.Label>Async-style search</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="Start typing" />
        <Combobox.ClearTrigger aria-label="Clear search" />
        <Combobox.Trigger aria-label="Open options" />
      </Combobox.Control>
      <ComboboxPopup items={collection.items} />
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
    <div className={styles.providerLayout}>
      <button type="button" onClick={() => combobox.focus()}>
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