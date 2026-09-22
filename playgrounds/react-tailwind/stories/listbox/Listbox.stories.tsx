import type { ListCollection } from '@ark-ui/react/collection';
import {
  createGridCollection,
  createListCollection,
  useListCollection,
} from '@ark-ui/react/collection';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  Listbox,
  ListboxClearTrigger,
  ListboxContent,
  ListboxEmpty,
  ListboxFilter,
  ListboxInput,
  ListboxItem,
  ListboxItemContext,
  ListboxItemGroup,
  ListboxItemGroupLabel,
  ListboxItemIndicator,
  ListboxItemText,
  ListboxItemTextContent,
  ListboxItemTextLabel,
  ListboxLabel,
  ListboxRootProvider,
  ListboxValueText,
  useListbox,
  useListboxContext,
} from '@/components/listbox/Listbox';

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

function OptionItems({ collection }: { collection: ListCollection<OptionItem> }) {
  return collection.items.map((item) => (
    <ListboxItem key={item.value} item={item}>
      <ListboxItemText>{item.label}</ListboxItemText>
      <ListboxItemIndicator />
    </ListboxItem>
  ));
}

const meta = {
  title: 'Components/Listbox',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const stackClassName = 'flex flex-col items-start gap-2';
const stateClassName = 'text-sm leading-5 text-muted-foreground';
const buttonClassName =
  'inline-flex min-h-8 cursor-pointer items-center justify-center rounded-md border border-border bg-background px-3 text-foreground transition-colors duration-200 ease-in-out hover:bg-accent focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-ring';

export const Basic: Story = {
  render: () => (
    <Listbox collection={countries}>
      <ListboxLabel>Select country</ListboxLabel>
      <ListboxContent>
        <OptionItems collection={countries} />
      </ListboxContent>
    </Listbox>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['md']);

    return (
      <div className={stackClassName}>
        <Listbox
          collection={sizes}
          value={value}
          onValueChange={(details) => setValue(details.value)}
        >
          <ListboxLabel>Select size</ListboxLabel>
          <ListboxContent>
            <OptionItems collection={sizes} />
          </ListboxContent>
        </Listbox>
        <span className={stateClassName}>Selected: {value[0] ?? 'none'}</span>
      </div>
    );
  },
};

export const RootProvider: Story = {
  render: () => {
    const listbox = useListbox({ collection: countries, defaultValue: ['ca'] });

    return (
      <div className={stackClassName}>
        <button className={buttonClassName} type="button" onClick={() => listbox.setValue(['jp'])}>
          Set to Japan
        </button>
        <ListboxRootProvider value={listbox}>
          <ListboxLabel>Select country</ListboxLabel>
          <ListboxContent>
            <OptionItems collection={countries} />
          </ListboxContent>
        </ListboxRootProvider>
      </div>
    );
  },
};

export const DisabledItem: Story = {
  render: () => (
    <Listbox collection={plans}>
      <ListboxLabel>Select plan</ListboxLabel>
      <ListboxContent>
        <OptionItems collection={plans} />
      </ListboxContent>
    </Listbox>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Listbox collection={days} selectionMode="multiple" defaultValue={['mon', 'wed', 'fri']}>
      <ListboxLabel>Select days</ListboxLabel>
      <ListboxContent>
        <OptionItems collection={days} />
      </ListboxContent>
      <ListboxValueText />
    </Listbox>
  ),
};

export const Extended: Story = {
  render: () => (
    <Listbox collection={days} selectionMode="extended">
      <ListboxLabel>Hold Cmd or Ctrl to select multiple</ListboxLabel>
      <ListboxContent>
        <OptionItems collection={days} />
      </ListboxContent>
    </Listbox>
  ),
};

export const Grouped: Story = {
  render: () => (
    <Listbox collection={regions}>
      <ListboxLabel>Select region</ListboxLabel>
      <ListboxContent>
        {regions.group().map(([region, items]) => (
          <ListboxItemGroup key={region} id={region}>
            <ListboxItemGroupLabel>{region}</ListboxItemGroupLabel>
            {items.map((item) => (
              <ListboxItem key={item.value} item={item}>
                <ListboxItemText>{item.label}</ListboxItemText>
                <ListboxItemIndicator />
              </ListboxItem>
            ))}
          </ListboxItemGroup>
        ))}
      </ListboxContent>
    </Listbox>
  ),
};

export const Filtering: Story = {
  render: () => {
    const [filterText, setFilterText] = useState('');
    const { collection, filter } = useListCollection<OptionItem>({
      initialItems: frameworkItems,
      filter: (itemText, value) => itemText.toLowerCase().includes(value.toLowerCase()),
    });

    return (
      <Listbox collection={collection} typeahead={false}>
        <ListboxLabel>Select framework</ListboxLabel>
        <ListboxFilter>
          <ListboxInput
            placeholder="Search frameworks..."
            value={filterText}
            onChange={(event) => {
              setFilterText(event.target.value);
              filter(event.target.value);
            }}
          />
          {filterText ? (
            <ListboxClearTrigger
              onClick={() => {
                setFilterText('');
                filter('');
              }}
            />
          ) : null}
        </ListboxFilter>
        <ListboxContent>
          <OptionItems collection={collection} />
          <ListboxEmpty>No frameworks found</ListboxEmpty>
        </ListboxContent>
      </Listbox>
    );
  },
};

export const StandaloneInput: Story = {
  render: () => {
    const { collection, filter } = useListCollection<OptionItem>({
      initialItems: frameworkItems,
      filter: (itemText, value) => itemText.toLowerCase().includes(value.toLowerCase()),
    });

    return (
      <Listbox collection={collection} typeahead={false}>
        <ListboxLabel>Select framework</ListboxLabel>
        <ListboxInput
          placeholder="Filter frameworks"
          onChange={(event) => filter(event.target.value)}
        />
        <ListboxContent>
          <OptionItems collection={collection} />
          <ListboxEmpty>No frameworks found</ListboxEmpty>
        </ListboxContent>
      </Listbox>
    );
  },
};

export const Horizontal: Story = {
  render: () => (
    <Listbox collection={albums} orientation="horizontal" className="w-full max-w-[34rem]">
      <ListboxLabel>Select album</ListboxLabel>
      <ListboxContent>
        {albums.items.map((item) => (
          <ListboxItem key={item.title} item={item} className="w-40 min-w-40">
            <ListboxItemText>
              <ListboxItemTextContent className="flex-col items-start gap-1">
                <ListboxItemTextLabel>{item.title}</ListboxItemTextLabel>
                <span className="text-xs leading-4 text-muted-foreground">{item.artist}</span>
              </ListboxItemTextContent>
            </ListboxItemText>
            <ListboxItemIndicator />
          </ListboxItem>
        ))}
      </ListboxContent>
    </Listbox>
  ),
};

export const Grid: Story = {
  render: () => (
    <Listbox collection={colors}>
      <ListboxLabel>Pick a color</ListboxLabel>
      <ListboxContent>
        {colors.items.map((item) => (
          <ListboxItem key={item.value} item={item}>
            <ListboxItemText>{item.label}</ListboxItemText>
          </ListboxItem>
        ))}
      </ListboxContent>
    </Listbox>
  ),
};

export const ItemContext: Story = {
  render: () => (
    <Listbox collection={countries} defaultValue={['ca']}>
      <ListboxLabel>Styled country</ListboxLabel>
      <ListboxContent>
        {countries.items.map((item) => (
          <ListboxItem key={item.value} item={item}>
            <ListboxItemContext>
              {(itemContext) => (
                <ListboxItemText>
                  {itemContext.selected ? `${item.label} (selected)` : item.label}
                </ListboxItemText>
              )}
            </ListboxItemContext>
            <ListboxItemIndicator />
          </ListboxItem>
        ))}
      </ListboxContent>
    </Listbox>
  ),
};

export const SelectAll: Story = {
  render: () => {
    function SelectAllTrigger() {
      const listbox = useListboxContext();
      const allValues = days.items.map((item) => item.value);
      const allSelected = listbox.value.length === allValues.length;

      return (
        <button
          className={buttonClassName}
          type="button"
          onClick={() => listbox.setValue(allSelected ? [] : allValues)}
        >
          {allSelected ? 'Clear all' : 'Select all'}
        </button>
      );
    }

    return (
      <Listbox collection={days} selectionMode="multiple">
        <ListboxLabel>Select days</ListboxLabel>
        <ListboxContent>
          <OptionItems collection={days} />
        </ListboxContent>
        <SelectAllTrigger />
      </Listbox>
    );
  },
};

export const CustomStyling: Story = {
  render: () => (
    <Listbox collection={countries} defaultValue={['ca']} className="w-72">
      <ListboxLabel className="text-primary">Styled country</ListboxLabel>
      <ListboxContent className="border-primary bg-muted shadow-sm">
        {countries.items.map((item) => (
          <ListboxItem
            key={item.value}
            item={item}
            className="data-highlighted:bg-primary data-highlighted:text-primary-foreground data-selected:text-primary"
          >
            <ListboxItemText>{item.label}</ListboxItemText>
            <ListboxItemIndicator />
          </ListboxItem>
        ))}
      </ListboxContent>
    </Listbox>
  ),
};