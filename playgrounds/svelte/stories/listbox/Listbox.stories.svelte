<script module lang="ts">
  import {
    createGridCollection,
    createListCollection,
    useListCollection,
  } from '@ark-ui/svelte/collection';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import {
    Listbox,
    ListboxClearTrigger,
    ListboxContent,
    ListboxContext,
    ListboxEmpty,
    ListboxFilter,
    ListboxInput,
    ListboxItem,
    ListboxItemContext,
    ListboxItemGroup,
    ListboxItemGroupLabel,
    ListboxItemIndicator,
    ListboxItemText,
    ListboxLabel,
    ListboxRootProvider,
    ListboxValueText,
    useListbox,
  } from '@/components/listbox';
  import styles from './Listbox.stories.module.css';
  import OptionItems from './OptionItems.svelte';

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

  const { Story } = defineMeta({
    title: 'Components/Listbox',
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });

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

  const allValues = days.items.map((item) => item.value);
</script>

<script lang="ts">
  let controlled = $state(['md']);
  const rootProvider = useListbox({ collection: countries, defaultValue: ['ca'] });
  let filterText = $state('');
  const filtering = useListCollection<OptionItem>({
    initialItems: frameworkItems,
    filter: (itemText, query) => itemText.toLowerCase().includes(query.toLowerCase()),
  });
  const standalone = useListCollection<OptionItem>({
    initialItems: frameworkItems,
    filter: (itemText, query) => itemText.toLowerCase().includes(query.toLowerCase()),
  });
</script>

<Story name="Basic" asChild>
  <Listbox collection={countries}>
    <ListboxLabel>Select country</ListboxLabel>
    <ListboxContent><OptionItems collection={countries} /></ListboxContent>
  </Listbox>
</Story>

<Story name="Controlled" asChild>
  <div class={styles.stack}>
    <Listbox bind:value={controlled} collection={sizes}>
      <ListboxLabel>Select size</ListboxLabel>
      <ListboxContent><OptionItems collection={sizes} /></ListboxContent>
    </Listbox>
    <span class={styles.state}>Selected: {controlled[0] ?? 'none'}</span>
  </div>
</Story>

<Story name="Root Provider" exportName="RootProvider" asChild>
  <div class={styles.stack}>
    <button class={styles.button} type="button" onclick={() => rootProvider().setValue(['jp'])}>
      Set to Japan
    </button>
    <ListboxRootProvider value={rootProvider}>
      <ListboxLabel>Select country</ListboxLabel>
      <ListboxContent><OptionItems collection={countries} /></ListboxContent>
    </ListboxRootProvider>
  </div>
</Story>

<Story name="Disabled Item" exportName="DisabledItem" asChild>
  <Listbox collection={plans}>
    <ListboxLabel>Select plan</ListboxLabel>
    <ListboxContent><OptionItems collection={plans} /></ListboxContent>
  </Listbox>
</Story>

<Story name="Multiple" asChild>
  <Listbox collection={days} selectionMode="multiple" defaultValue={['mon', 'wed', 'fri']}>
    <ListboxLabel>Select days</ListboxLabel>
    <ListboxContent><OptionItems collection={days} /></ListboxContent>
    <ListboxValueText />
  </Listbox>
</Story>

<Story name="Extended" asChild>
  <Listbox collection={days} selectionMode="extended">
    <ListboxLabel>Hold Cmd or Ctrl to select multiple</ListboxLabel>
    <ListboxContent><OptionItems collection={days} /></ListboxContent>
  </Listbox>
</Story>

<Story name="Grouped" asChild>
  <Listbox collection={regions}>
    <ListboxLabel>Select region</ListboxLabel>
    <ListboxContent>
      {#each regions.group() as [region, items] (region)}
        <ListboxItemGroup id={region}>
          <ListboxItemGroupLabel>{region}</ListboxItemGroupLabel>
          {#each items as item (item.value)}
            <ListboxItem {item}>
              <ListboxItemText>{item.label}</ListboxItemText>
              <ListboxItemIndicator />
            </ListboxItem>
          {/each}
        </ListboxItemGroup>
      {/each}
    </ListboxContent>
  </Listbox>
</Story>

<Story name="Filtering" asChild>
  <Listbox collection={filtering.collection()} typeahead={false}>
    <ListboxLabel>Select framework</ListboxLabel>
    <ListboxFilter>
      <ListboxInput
        placeholder="Search frameworks..."
        value={filterText}
        oninput={(event) => {
          filterText = event.currentTarget.value;
          filtering.filter(filterText);
        }}
      />
      {#if filterText}
        <ListboxClearTrigger
          onclick={() => {
            filterText = '';
            filtering.filter('');
          }}
        />
      {/if}
    </ListboxFilter>
    <ListboxContent>
      <OptionItems collection={filtering.collection()} />
      <ListboxEmpty>No frameworks found</ListboxEmpty>
    </ListboxContent>
  </Listbox>
</Story>

<Story name="Standalone Input" exportName="StandaloneInput" asChild>
  <Listbox collection={standalone.collection()} typeahead={false}>
    <ListboxLabel>Select framework</ListboxLabel>
    <ListboxInput
      placeholder="Filter frameworks"
      oninput={(event) => standalone.filter(event.currentTarget.value)}
    />
    <ListboxContent>
      <OptionItems collection={standalone.collection()} />
      <ListboxEmpty>No frameworks found</ListboxEmpty>
    </ListboxContent>
  </Listbox>
</Story>

<Story name="Horizontal" asChild>
  <Listbox collection={albums} orientation="horizontal" class={styles.horizontalRoot}>
    <ListboxLabel>Select album</ListboxLabel>
    <ListboxContent>
      {#each albums.items as item (item.title)}
        <ListboxItem {item}>
          <ListboxItemText>
            {item.title}<span class={styles.artist}>{item.artist}</span>
          </ListboxItemText>
          <ListboxItemIndicator />
        </ListboxItem>
      {/each}
    </ListboxContent>
  </Listbox>
</Story>

<Story name="Grid" asChild>
  <Listbox collection={colors}>
    <ListboxLabel>Pick a color</ListboxLabel>
    <ListboxContent>
      {#each colors.items as item (item.value)}
        <ListboxItem {item}><ListboxItemText>{item.label}</ListboxItemText></ListboxItem>
      {/each}
    </ListboxContent>
  </Listbox>
</Story>

<Story name="Item Context" exportName="ItemContext" asChild>
  <Listbox collection={countries} defaultValue={['ca']}>
    <ListboxLabel>Styled country</ListboxLabel>
    <ListboxContent>
      {#each countries.items as item (item.value)}
        <ListboxItem {item}>
          <ListboxItemContext>
            {#snippet render(context)}
              <ListboxItemText>
                {context().selected ? `${item.label} (selected)` : item.label}
              </ListboxItemText>
            {/snippet}
          </ListboxItemContext>
          <ListboxItemIndicator />
        </ListboxItem>
      {/each}
    </ListboxContent>
  </Listbox>
</Story>

<Story name="Select All" exportName="SelectAll" asChild>
  <Listbox collection={days} selectionMode="multiple">
    <ListboxLabel>Select days</ListboxLabel>
    <ListboxContent><OptionItems collection={days} /></ListboxContent>
    <ListboxContext>
      {#snippet render(context)}
        <button
          class={styles.button}
          type="button"
          onclick={() =>
            context().setValue(context().value.length === allValues.length ? [] : allValues)}
        >
          {context().value.length === allValues.length ? 'Clear all' : 'Select all'}
        </button>
      {/snippet}
    </ListboxContext>
  </Listbox>
</Story>

<Story name="Custom Styling" exportName="CustomStyling" asChild>
  <Listbox collection={countries} defaultValue={['ca']} class={styles.customRoot}>
    <ListboxLabel class={styles.customLabel}>Styled country</ListboxLabel>
    <ListboxContent class={styles.customContent}>
      {#each countries.items as item (item.value)}
        <ListboxItem {item} class={styles.customItem}>
          <ListboxItemText>{item.label}</ListboxItemText>
          <ListboxItemIndicator />
        </ListboxItem>
      {/each}
    </ListboxContent>
  </Listbox>
</Story>