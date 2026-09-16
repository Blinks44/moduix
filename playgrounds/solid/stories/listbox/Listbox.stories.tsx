import {
  createGridCollection,
  createListCollection,
  type ListCollection,
  useListCollection,
} from '@ark-ui/solid/collection';
import { createSignal, For } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Listbox, useListbox, useListboxContext } from '@/components/listbox/Listbox';
import styles from './Listbox.stories.module.css';

interface OptionItem {
  label: string;
  value: string;
  disabled?: boolean;
}

interface RegionItem extends OptionItem {
  region: string;
}

interface AlbumItem {
  title: string;
  artist: string;
}

const countries = createListCollection<OptionItem>({
  items: [
    { label: 'United States', value: 'us' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'Canada', value: 'ca' },
    { label: 'Australia', value: 'au' },
    { label: 'Germany', value: 'de' },
    { label: 'France', value: 'fr' },
    { label: 'Japan', value: 'jp' },
  ],
});

const sizes = createListCollection<OptionItem>({
  items: [
    { label: 'Small', value: 'sm' },
    { label: 'Medium', value: 'md' },
    { label: 'Large', value: 'lg' },
    { label: 'Extra Large', value: 'xl' },
  ],
});

const plans = createListCollection<OptionItem>({
  items: [
    { label: 'Free', value: 'free' },
    { label: 'Pro', value: 'pro' },
    { label: 'Enterprise', value: 'enterprise', disabled: true },
    { label: 'Custom', value: 'custom' },
  ],
});

const days = createListCollection<OptionItem>({
  items: [
    { label: 'Monday', value: 'mon' },
    { label: 'Tuesday', value: 'tue' },
    { label: 'Wednesday', value: 'wed' },
    { label: 'Thursday', value: 'thu' },
    { label: 'Friday', value: 'fri' },
    { label: 'Saturday', value: 'sat' },
    { label: 'Sunday', value: 'sun' },
  ],
});

const regions = createListCollection<RegionItem>({
  items: [
    { label: 'New York', value: 'nyc', region: 'North America' },
    { label: 'Los Angeles', value: 'lax', region: 'North America' },
    { label: 'Toronto', value: 'yyz', region: 'North America' },
    { label: 'London', value: 'lhr', region: 'Europe' },
    { label: 'Paris', value: 'cdg', region: 'Europe' },
    { label: 'Berlin', value: 'ber', region: 'Europe' },
    { label: 'Tokyo', value: 'nrt', region: 'Asia Pacific' },
    { label: 'Singapore', value: 'sin', region: 'Asia Pacific' },
    { label: 'Sydney', value: 'syd', region: 'Asia Pacific' },
  ],
  groupBy: (item) => item.region,
});

const albums = createListCollection<AlbumItem>({
  items: [
    { title: 'Midnight Dreams', artist: 'Luna Ray' },
    { title: 'Neon Skyline', artist: 'The Electric' },
    { title: 'Acoustic Sessions', artist: 'Sarah Woods' },
    { title: 'Urban Echoes', artist: 'Metro Collective' },
    { title: 'Summer Vibes', artist: 'Coastal Waves' },
  ],
  itemToValue: (item) => item.title,
  itemToString: (item) => item.title,
});

const colors = createGridCollection({
  items: [
    { label: 'Red', value: 'red' },
    { label: 'Green', value: 'green' },
    { label: 'Blue', value: 'blue' },
    { label: 'Yellow', value: 'yellow' },
    { label: 'Purple', value: 'purple' },
    { label: 'Orange', value: 'orange' },
  ],
  columnCount: 3,
});

const frameworkItems: OptionItem[] = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Solid', value: 'solid' },
  { label: 'Preact', value: 'preact' },
];

function OptionItems(props: { collection: ListCollection<OptionItem> }) {
  return (
    <For each={props.collection.items}>
      {(item) => (
        <Listbox.Item item={item}>
          <Listbox.ItemText>{item.label}</Listbox.ItemText>
          <Listbox.ItemIndicator />
        </Listbox.Item>
      )}
    </For>
  );
}

const meta = {
  title: 'Components/Listbox',
  component: Listbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Listbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Listbox collection={countries}>
      <Listbox.Label>Select country</Listbox.Label>
      <Listbox.Content>
        <OptionItems collection={countries} />
      </Listbox.Content>
    </Listbox>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = createSignal<string[]>(['md']);

    return (
      <div class={styles.stack}>
        <Listbox
          collection={sizes}
          value={value()}
          onValueChange={(details) => setValue(details.value)}
        >
          <Listbox.Label>Select size</Listbox.Label>
          <Listbox.Content>
            <OptionItems collection={sizes} />
          </Listbox.Content>
        </Listbox>
        <span class={styles.state}>Selected: {value()[0] ?? 'none'}</span>
      </div>
    );
  },
};

export const RootProvider: Story = {
  render: () => {
    const listbox = useListbox({ collection: countries, defaultValue: ['ca'] });

    return (
      <div class={styles.stack}>
        <button class={styles.button} type="button" onClick={() => listbox().setValue(['jp'])}>
          Set to Japan
        </button>
        <Listbox.RootProvider value={listbox}>
          <Listbox.Label>Select country</Listbox.Label>
          <Listbox.Content>
            <OptionItems collection={countries} />
          </Listbox.Content>
        </Listbox.RootProvider>
      </div>
    );
  },
};

export const DisabledItem: Story = {
  render: () => (
    <Listbox collection={plans}>
      <Listbox.Label>Select plan</Listbox.Label>
      <Listbox.Content>
        <OptionItems collection={plans} />
      </Listbox.Content>
    </Listbox>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Listbox collection={days} selectionMode="multiple" defaultValue={['mon', 'wed', 'fri']}>
      <Listbox.Label>Select days</Listbox.Label>
      <Listbox.Content>
        <OptionItems collection={days} />
      </Listbox.Content>
      <Listbox.ValueText />
    </Listbox>
  ),
};

export const Extended: Story = {
  render: () => (
    <Listbox collection={days} selectionMode="extended">
      <Listbox.Label>Hold Cmd or Ctrl to select multiple</Listbox.Label>
      <Listbox.Content>
        <OptionItems collection={days} />
      </Listbox.Content>
    </Listbox>
  ),
};

export const Grouped: Story = {
  render: () => (
    <Listbox collection={regions}>
      <Listbox.Label>Select region</Listbox.Label>
      <Listbox.Content>
        {regions.group().map(([region, items]) => (
          <Listbox.ItemGroup id={region}>
            <Listbox.ItemGroupLabel>{region}</Listbox.ItemGroupLabel>
            {items.map((item) => (
              <Listbox.Item item={item}>
                <Listbox.ItemText>{item.label}</Listbox.ItemText>
                <Listbox.ItemIndicator />
              </Listbox.Item>
            ))}
          </Listbox.ItemGroup>
        ))}
      </Listbox.Content>
    </Listbox>
  ),
};

export const Filtering: Story = {
  render: () => {
    const [filterText, setFilterText] = createSignal('');
    const collectionState = useListCollection<OptionItem>({
      initialItems: frameworkItems,
      filter: (itemText, value) => itemText.toLowerCase().includes(value.toLowerCase()),
    });

    return (
      <Listbox collection={collectionState.collection()} typeahead={false}>
        <Listbox.Label>Select framework</Listbox.Label>
        <Listbox.Filter>
          <Listbox.Input
            placeholder="Search frameworks..."
            value={filterText()}
            onInput={(event) => {
              setFilterText(event.currentTarget.value);
              collectionState.filter(event.currentTarget.value);
            }}
          />
          {filterText() ? (
            <Listbox.ClearTrigger
              onClick={() => {
                setFilterText('');
                collectionState.filter('');
              }}
            />
          ) : null}
        </Listbox.Filter>
        <Listbox.Content>
          <OptionItems collection={collectionState.collection()} />
          <Listbox.Empty>No frameworks found</Listbox.Empty>
        </Listbox.Content>
      </Listbox>
    );
  },
};

export const StandaloneInput: Story = {
  render: () => {
    const collectionState = useListCollection<OptionItem>({
      initialItems: frameworkItems,
      filter: (itemText, value) => itemText.toLowerCase().includes(value.toLowerCase()),
    });

    return (
      <Listbox collection={collectionState.collection()} typeahead={false}>
        <Listbox.Label>Select framework</Listbox.Label>
        <Listbox.Input
          placeholder="Filter frameworks"
          onInput={(event) => collectionState.filter(event.currentTarget.value)}
        />
        <Listbox.Content>
          <OptionItems collection={collectionState.collection()} />
          <Listbox.Empty>No frameworks found</Listbox.Empty>
        </Listbox.Content>
      </Listbox>
    );
  },
};

export const Horizontal: Story = {
  render: () => (
    <Listbox collection={albums} orientation="horizontal" class={styles.horizontalRoot}>
      <Listbox.Label>Select album</Listbox.Label>
      <Listbox.Content>
        {albums.items.map((item) => (
          <Listbox.Item item={item}>
            <Listbox.ItemText>
              <Listbox.ItemTextContent class={styles.albumText}>
                <Listbox.ItemTextLabel>{item.title}</Listbox.ItemTextLabel>
                <span class={styles.artist}>{item.artist}</span>
              </Listbox.ItemTextContent>
            </Listbox.ItemText>
            <Listbox.ItemIndicator />
          </Listbox.Item>
        ))}
      </Listbox.Content>
    </Listbox>
  ),
};

export const Grid: Story = {
  render: () => (
    <Listbox collection={colors}>
      <Listbox.Label>Pick a color</Listbox.Label>
      <Listbox.Content>
        {colors.items.map((item) => (
          <Listbox.Item item={item}>
            <Listbox.ItemText>{item.label}</Listbox.ItemText>
          </Listbox.Item>
        ))}
      </Listbox.Content>
    </Listbox>
  ),
};

export const ItemContext: Story = {
  render: () => (
    <Listbox collection={countries} defaultValue={['ca']}>
      <Listbox.Label>Styled country</Listbox.Label>
      <Listbox.Content>
        {countries.items.map((item) => (
          <Listbox.Item item={item}>
            <Listbox.ItemContext>
              {(itemContext) => (
                <Listbox.ItemText>
                  {itemContext().selected ? `${item.label} (selected)` : item.label}
                </Listbox.ItemText>
              )}
            </Listbox.ItemContext>
            <Listbox.ItemIndicator />
          </Listbox.Item>
        ))}
      </Listbox.Content>
    </Listbox>
  ),
};

export const SelectAll: Story = {
  render: () => {
    function SelectAllTrigger() {
      const listbox = useListboxContext();
      const allValues = days.items.map((item) => item.value);
      const allSelected = () => listbox().value.length === allValues.length;

      return (
        <button
          class={styles.button}
          type="button"
          onClick={() => listbox().setValue(allSelected() ? [] : allValues)}
        >
          {allSelected() ? 'Clear all' : 'Select all'}
        </button>
      );
    }

    return (
      <Listbox collection={days} selectionMode="multiple">
        <Listbox.Label>Select days</Listbox.Label>
        <Listbox.Content>
          <OptionItems collection={days} />
        </Listbox.Content>
        <SelectAllTrigger />
      </Listbox>
    );
  },
};

export const CustomStyling: Story = {
  render: () => (
    <Listbox collection={countries} defaultValue={['ca']} class={styles.customRoot}>
      <Listbox.Label class={styles.customLabel}>Styled country</Listbox.Label>
      <Listbox.Content class={styles.customContent}>
        {countries.items.map((item) => (
          <Listbox.Item item={item} class={styles.customItem}>
            <Listbox.ItemText>{item.label}</Listbox.ItemText>
            <Listbox.ItemIndicator />
          </Listbox.Item>
        ))}
      </Listbox.Content>
    </Listbox>
  ),
};