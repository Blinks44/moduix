import type { ReactNode } from 'react';
import {
  createGridCollection,
  createListCollection,
  useListCollection,
} from '@ark-ui/react/collection';
import { useListbox, useListboxContext } from '@ark-ui/react/listbox';
import { Button, Listbox } from '@moduix/react';
import { useState } from 'react';
import type { CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';
import styles from './listbox.module.css';

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

const priorities = createListCollection<OptionItem>({
  items: [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
    { label: 'Critical', value: 'critical' },
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

const frameworks = createListCollection<OptionItem>({
  items: [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Solid', value: 'solid' },
    { label: 'Preact', value: 'preact' },
  ],
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

const filterItems: OptionItem[] = [
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

export const listboxOverrideCssProperties: CssPropertyInput[] = [
  ['--listbox-bg', 'var(--color-background)', 'Controls input and content background.'],
  ['--listbox-border-color', 'var(--color-border)', 'Controls input and content border color.'],
  ['--listbox-border-width', 'var(--border-width-sm)', 'Controls input and content border width.'],
  ['--listbox-color', 'var(--color-foreground)', 'Controls root text color.'],
  ['--listbox-content-max-height', '14rem', 'Controls content maximum height.'],
  ['--listbox-content-padding-y', 'var(--spacing-1)', 'Controls content vertical padding.'],
  ['--listbox-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  ['--listbox-empty-color', 'var(--color-muted-foreground)', 'Controls empty message color.'],
  ['--listbox-empty-font-size', 'var(--text-sm)', 'Controls empty message font size.'],
  ['--listbox-empty-line-height', 'var(--line-height-text-sm)', 'Controls empty line height.'],
  ['--listbox-empty-padding-x', 'var(--spacing-3)', 'Controls empty horizontal padding.'],
  ['--listbox-empty-padding-y', 'var(--spacing-3)', 'Controls empty vertical padding.'],
  ['--listbox-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  ['--listbox-focus-ring-width', 'var(--border-width-sm)', 'Controls focus ring width.'],
  ['--listbox-grid-gap', 'var(--spacing-1)', 'Controls grid content gap.'],
  ['--listbox-grid-padding', 'var(--spacing-2)', 'Controls grid content padding.'],
  ['--listbox-grid-selected-bg', 'var(--color-muted)', 'Controls selected grid item background.'],
  [
    '--listbox-grid-selected-color',
    'var(--color-foreground)',
    'Controls selected grid item text color.',
  ],
  ['--listbox-highlight-bg', 'var(--color-accent)', 'Controls highlighted item background.'],
  [
    '--listbox-highlight-color',
    'var(--color-accent-foreground)',
    'Controls highlighted item text color.',
  ],
  ['--listbox-hover-bg', 'var(--listbox-highlight-bg)', 'Controls hovered item background.'],
  ['--listbox-hover-color', 'var(--listbox-highlight-color)', 'Controls hovered item text color.'],
  [
    '--listbox-horizontal-content-max-height',
    'none',
    'Controls horizontal content maximum height.',
  ],
  ['--listbox-horizontal-gap', 'var(--spacing-2)', 'Controls horizontal item gap.'],
  ['--listbox-horizontal-item-width', '11rem', 'Controls horizontal item width.'],
  ['--listbox-input-height', 'var(--size-lg)', 'Controls filter input height.'],
  ['--listbox-input-bg', 'var(--color-background)', 'Controls filter input background.'],
  [
    '--listbox-input-border-color',
    'var(--listbox-border-color)',
    'Controls filter input border color.',
  ],
  [
    '--listbox-input-border-width',
    'var(--listbox-border-width)',
    'Controls filter input border width.',
  ],
  ['--listbox-input-color', 'var(--listbox-color)', 'Controls filter input text color.'],
  [
    '--listbox-input-focus-ring-color',
    'var(--listbox-focus-ring-color)',
    'Controls filter input focus ring color.',
  ],
  [
    '--listbox-input-focus-ring-width',
    'var(--listbox-focus-ring-width)',
    'Controls filter input focus ring width.',
  ],
  ['--listbox-input-font-size', 'var(--text-md)', 'Controls filter input font size.'],
  [
    '--listbox-input-line-height',
    'var(--line-height-text-md)',
    'Controls filter input line height.',
  ],
  ['--listbox-input-padding-x', 'var(--spacing-3)', 'Controls filter input horizontal padding.'],
  ['--listbox-input-padding-y', 'var(--spacing-2)', 'Controls filter input vertical padding.'],
  ['--listbox-input-radius', 'var(--listbox-radius)', 'Controls filter input radius.'],
  ['--listbox-item-bg', 'transparent', 'Controls item background.'],
  ['--listbox-item-border-color', 'transparent', 'Controls item border color.'],
  ['--listbox-item-border-width', '0', 'Controls item border width.'],
  ['--listbox-item-color', 'var(--color-foreground)', 'Controls item text color.'],
  [
    '--listbox-item-disabled-color',
    'var(--color-muted-foreground)',
    'Controls disabled item text color.',
  ],
  ['--listbox-item-font-size', 'var(--text-sm)', 'Controls item font size.'],
  ['--listbox-item-gap', 'var(--spacing-2)', 'Controls item content gap.'],
  ['--listbox-item-group-gap', 'var(--spacing-2)', 'Controls gap between item groups.'],
  [
    '--listbox-item-group-label-color',
    'var(--color-muted-foreground)',
    'Controls group label color.',
  ],
  ['--listbox-item-group-label-font-size', 'var(--text-xs)', 'Controls group label font size.'],
  [
    '--listbox-item-group-label-font-weight',
    'var(--weight-semibold)',
    'Controls group label font weight.',
  ],
  [
    '--listbox-item-group-label-line-height',
    'var(--line-height-text-xs)',
    'Controls group label line height.',
  ],
  [
    '--listbox-item-group-label-padding-x',
    'var(--spacing-2)',
    'Controls group label horizontal padding.',
  ],
  [
    '--listbox-item-group-label-padding-y',
    'var(--spacing-1)',
    'Controls group label vertical padding.',
  ],
  ['--listbox-item-indicator-color', 'currentColor', 'Controls selected indicator color.'],
  ['--listbox-item-indicator-icon-size', '0.75rem', 'Controls selected icon size.'],
  ['--listbox-item-indicator-size', '1rem', 'Controls selected indicator box size.'],
  ['--listbox-item-inset-x', 'var(--spacing-2)', 'Controls item horizontal inset.'],
  ['--listbox-item-line-height', 'var(--line-height-text-sm)', 'Controls item line height.'],
  ['--listbox-item-min-height', '2rem', 'Controls item minimum height.'],
  ['--listbox-item-padding-x', 'var(--spacing-3)', 'Controls item horizontal padding.'],
  ['--listbox-item-padding-y', 'var(--spacing-2)', 'Controls item vertical padding.'],
  ['--listbox-item-radius', 'var(--radius-sm)', 'Controls item radius.'],
  ['--listbox-item-selected-color', 'var(--listbox-item-color)', 'Controls selected item color.'],
  ['--listbox-item-text-content-gap', 'var(--spacing-2)', 'Controls rich item text gap.'],
  ['--listbox-item-text-icon-color', 'currentColor', 'Controls rich item icon color.'],
  ['--listbox-item-text-icon-size', '1rem', 'Controls rich item icon size.'],
  ['--listbox-label-color', 'var(--listbox-color)', 'Controls label color.'],
  ['--listbox-label-font-size', 'var(--text-sm)', 'Controls label font size.'],
  ['--listbox-label-font-weight', 'var(--weight-medium)', 'Controls label font weight.'],
  ['--listbox-label-line-height', 'var(--line-height-text-sm)', 'Controls label line height.'],
  ['--listbox-max-width', '100%', 'Controls root maximum width.'],
  ['--listbox-placeholder-color', 'var(--color-muted-foreground)', 'Controls input placeholder.'],
  ['--listbox-radius', 'var(--radius-md)', 'Controls input and content radius.'],
  ['--listbox-root-gap', 'var(--spacing-3)', 'Controls root internal gap.'],
  ['--listbox-transition', 'var(--transition-default)', 'Controls interactive transitions.'],
  ['--listbox-value-text-color', 'var(--color-muted-foreground)', 'Controls value text color.'],
  ['--listbox-value-text-font-size', 'var(--text-sm)', 'Controls value text font size.'],
  [
    '--listbox-value-text-line-height',
    'var(--line-height-text-sm)',
    'Controls value text line height.',
  ],
  ['--listbox-width', '16rem', 'Controls root width.'],
];

export function ListboxCssPropertiesPanel() {
  return (
    <CSSPropertiesReferenceTable
      properties={listboxOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}

function ListboxItems({ collection = countries }: { collection?: typeof countries }) {
  return collection.items.map((item) => (
    <Listbox.Item key={item.value} item={item}>
      <Listbox.ItemText>{item.label}</Listbox.ItemText>
      <Listbox.ItemIndicator />
    </Listbox.Item>
  ));
}

function Stack({ children }: { children: ReactNode }) {
  return <div className={styles.stack}>{children}</div>;
}

export function ListboxExample() {
  return (
    <Listbox collection={countries} className={styles.root}>
      <Listbox.Label>Select country</Listbox.Label>
      <Listbox.Content>
        <ListboxItems />
      </Listbox.Content>
    </Listbox>
  );
}

export function ControlledListboxExample() {
  const [value, setValue] = useState<string[]>(['md']);

  return (
    <Stack>
      <Listbox
        collection={sizes}
        className={styles.root}
        value={value}
        onValueChange={(details) => setValue(details.value)}
      >
        <Listbox.Label>Select size</Listbox.Label>
        <Listbox.Content>
          <ListboxItems collection={sizes} />
        </Listbox.Content>
      </Listbox>
      <output>Selected: {value[0] ?? 'none'}</output>
    </Stack>
  );
}

export function RootProviderListboxExample() {
  const listbox = useListbox({ collection: priorities });

  return (
    <Stack>
      <Button onClick={() => listbox.setValue(['high'])}>Set to high</Button>
      <Listbox.RootProvider value={listbox} className={styles.root}>
        <Listbox.Label>Select priority</Listbox.Label>
        <Listbox.Content>
          <ListboxItems collection={priorities} />
        </Listbox.Content>
      </Listbox.RootProvider>
    </Stack>
  );
}

export function DisabledItemListboxExample() {
  return (
    <Listbox collection={plans} className={styles.root}>
      <Listbox.Label>Select plan</Listbox.Label>
      <Listbox.Content>
        <ListboxItems collection={plans} />
      </Listbox.Content>
    </Listbox>
  );
}

export function MultipleListboxExample() {
  return (
    <Listbox
      collection={days}
      className={styles.root}
      selectionMode="multiple"
      defaultValue={['mon', 'wed', 'fri']}
    >
      <Listbox.Label>Select days</Listbox.Label>
      <Listbox.Content>
        <ListboxItems collection={days} />
      </Listbox.Content>
      <Listbox.ValueText />
    </Listbox>
  );
}

export function GroupedListboxExample() {
  return (
    <Listbox collection={regions} className={styles.root}>
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
  );
}

export function ExtendedSelectListboxExample() {
  return (
    <Listbox collection={frameworks} className={styles.root} selectionMode="extended">
      <Listbox.Label>Hold Cmd or Ctrl to select multiple</Listbox.Label>
      <Listbox.Content>
        <ListboxItems collection={frameworks} />
      </Listbox.Content>
    </Listbox>
  );
}

export function HorizontalListboxExample() {
  return (
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
  );
}

export function GridListboxExample() {
  return (
    <Listbox collection={colors} className={styles.gridRoot}>
      <Listbox.Label>Pick a color</Listbox.Label>
      <Listbox.Content>
        {colors.items.map((item) => (
          <Listbox.Item key={item.value} item={item}>
            <Listbox.ItemText>{item.label}</Listbox.ItemText>
          </Listbox.Item>
        ))}
      </Listbox.Content>
    </Listbox>
  );
}

export function FilteringListboxExample() {
  const { collection, filter } = useListCollection<OptionItem>({
    initialItems: filterItems,
    filter: (itemText, filterText) => itemText.toLowerCase().includes(filterText.toLowerCase()),
  });

  return (
    <Listbox collection={collection} className={styles.root} typeahead={false}>
      <Listbox.Label>Select framework</Listbox.Label>
      <Listbox.Input
        placeholder="Filter frameworks"
        onChange={(event) => filter(event.target.value)}
      />
      <Listbox.Content>
        {collection.items.map((item) => (
          <Listbox.Item key={item.value} item={item}>
            <Listbox.ItemText>{item.label}</Listbox.ItemText>
            <Listbox.ItemIndicator />
          </Listbox.Item>
        ))}
        <Listbox.Empty>No frameworks found</Listbox.Empty>
      </Listbox.Content>
    </Listbox>
  );
}

function SelectAllListboxTrigger() {
  const listbox = useListboxContext();
  const allValues = days.items.map((item) => item.value);
  const allSelected = listbox.value.length === allValues.length;

  return (
    <Button onClick={() => listbox.setValue(allSelected ? [] : allValues)}>
      {allSelected ? 'Clear all' : 'Select all'}
    </Button>
  );
}

export function SelectAllListboxExample() {
  return (
    <Stack>
      <Listbox collection={days} className={styles.root} selectionMode="multiple">
        <Listbox.Label>Select days</Listbox.Label>
        <SelectAllListboxTrigger />
        <Listbox.Content>
          <ListboxItems collection={days} />
        </Listbox.Content>
      </Listbox>
    </Stack>
  );
}

export function ValueTextListboxExample() {
  return (
    <Listbox collection={countries} className={styles.root} defaultValue={['ca']}>
      <Listbox.Label>Select country</Listbox.Label>
      <Listbox.Content>
        <ListboxItems />
      </Listbox.Content>
      <Listbox.ValueText placeholder="No country selected" />
    </Listbox>
  );
}