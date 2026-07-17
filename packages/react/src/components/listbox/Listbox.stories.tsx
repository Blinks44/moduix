import type { ListCollection } from '@ark-ui/react/collection';
import {
  createGridCollection,
  createListCollection,
  useListCollection,
} from '@ark-ui/react/collection';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Listbox, useListbox } from './Listbox';
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

function OptionItems({ collection }: { collection: ListCollection<OptionItem> }) {
  return collection.items.map((item) => (
    <Listbox.Item key={item.value} item={item}>
      <Listbox.ItemText>{item.label}</Listbox.ItemText>
      <Listbox.ItemIndicator />
    </Listbox.Item>
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
    const [value, setValue] = useState<string[]>(['md']);

    return (
      <div className={styles.stack}>
        <Listbox
          collection={sizes}
          value={value}
          onValueChange={(details) => setValue(details.value)}
        >
          <Listbox.Label>Select size</Listbox.Label>
          <Listbox.Content>
            <OptionItems collection={sizes} />
          </Listbox.Content>
        </Listbox>
        <span className={styles.state}>Selected: {value[0] ?? 'none'}</span>
      </div>
    );
  },
};

export const RootProvider: Story = {
  render: () => {
    const listbox = useListbox({ collection: countries, defaultValue: ['ca'] });

    return (
      <div className={styles.stack}>
        <button className={styles.button} type="button" onClick={() => listbox.setValue(['jp'])}>
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

export const Grouped: Story = {
  render: () => (
    <Listbox collection={regions}>
      <Listbox.Label>Select region</Listbox.Label>
      <Listbox.Content>
        {regions.group().map(([region, items]) => (
          <Listbox.ItemGroup key={region} id={region}>
            <Listbox.ItemGroupLabel>{region}</Listbox.ItemGroupLabel>
            {items.map((item) => (
              <Listbox.Item key={item.value} item={item}>
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
    const { collection, filter } = useListCollection<OptionItem>({
      initialItems: frameworkItems,
      filter: (itemText, filterText) => itemText.toLowerCase().includes(filterText.toLowerCase()),
    });

    return (
      <Listbox collection={collection} typeahead={false}>
        <Listbox.Label>Select framework</Listbox.Label>
        <Listbox.Input
          placeholder="Filter frameworks"
          onChange={(event) => filter(event.target.value)}
        />
        <Listbox.Content>
          <OptionItems collection={collection} />
          <Listbox.Empty>No frameworks found</Listbox.Empty>
        </Listbox.Content>
      </Listbox>
    );
  },
};

export const Horizontal: Story = {
  render: () => (
    <Listbox collection={albums} orientation="horizontal" className={styles.horizontalRoot}>
      <Listbox.Label>Select album</Listbox.Label>
      <Listbox.Content>
        {albums.items.map((item) => (
          <Listbox.Item key={item.title} item={item}>
            <Listbox.ItemText>
              <Listbox.ItemTextContent className={styles.albumText}>
                <Listbox.ItemTextLabel>{item.title}</Listbox.ItemTextLabel>
                <span className={styles.artist}>{item.artist}</span>
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
          <Listbox.Item key={item.value} item={item}>
            <Listbox.ItemText>{item.label}</Listbox.ItemText>
          </Listbox.Item>
        ))}
      </Listbox.Content>
    </Listbox>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <Listbox collection={countries} defaultValue={['ca']} className={styles.customRoot}>
      <Listbox.Label className={styles.customLabel}>Styled country</Listbox.Label>
      <Listbox.Content className={styles.customContent}>
        {countries.items.map((item) => (
          <Listbox.Item key={item.value} item={item} className={styles.customItem}>
            <Listbox.ItemText>{item.label}</Listbox.ItemText>
            <Listbox.ItemIndicator />
          </Listbox.Item>
        ))}
      </Listbox.Content>
    </Listbox>
  ),
};