import {
  createGridCollection,
  createListCollection,
  useListCollection,
} from '@ark-ui/vue/collection';
import type { ListCollection } from '@ark-ui/vue/collection';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref } from 'vue';
import type { Component, PropType } from 'vue';
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
  ListboxItemTextContent,
  ListboxItemTextLabel,
  ListboxLabel,
  ListboxRootProvider,
  ListboxValueText,
  useListbox,
} from '@/components/listbox';
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

const listboxComponents = {
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
  ListboxItemTextContent,
  ListboxItemTextLabel,
  ListboxLabel,
  ListboxRootProvider,
  ListboxValueText,
} as unknown as Record<string, Component>;

const OptionItems = defineComponent({
  components: listboxComponents,
  props: { collection: { type: Object as PropType<ListCollection<OptionItem>>, required: true } },
  template:
    '<ListboxItem v-for="item in collection.items" :key="item.value" :item="item"><ListboxItemText>{{ item.label }}</ListboxItemText><ListboxItemIndicator /></ListboxItem>',
});

const storyComponents = { ...listboxComponents, OptionItems };

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return { styles, ...setup?.() };
      },
      template,
    });
}

const meta = {
  title: 'Components/Listbox',
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: renderStory(
    '<Listbox :collection="countries"><ListboxLabel>Select country</ListboxLabel><ListboxContent><OptionItems :collection="countries" /></ListboxContent></Listbox>',
    () => ({ countries }),
  ),
};

export const Controlled: Story = {
  render: renderStory(
    '<div :class="styles.stack"><Listbox v-model="value" :collection="sizes"><ListboxLabel>Select size</ListboxLabel><ListboxContent><OptionItems :collection="sizes" /></ListboxContent></Listbox><span :class="styles.state">Selected: {{ value[0] ?? "none" }}</span></div>',
    () => ({ countries, sizes, value: ref<string[]>(['md']) }),
  ),
};

export const RootProvider: Story = {
  render: renderStory(
    '<div :class="styles.stack"><button :class="styles.button" type="button" @click="listbox.setValue([&quot;jp&quot;])">Set to Japan</button><ListboxRootProvider :value="listbox"><ListboxLabel>Select country</ListboxLabel><ListboxContent><OptionItems :collection="countries" /></ListboxContent></ListboxRootProvider></div>',
    () => ({ countries, listbox: useListbox({ collection: countries, defaultValue: ['ca'] }) }),
  ),
};

export const DisabledItem: Story = {
  render: renderStory(
    '<Listbox :collection="plans"><ListboxLabel>Select plan</ListboxLabel><ListboxContent><OptionItems :collection="plans" /></ListboxContent></Listbox>',
    () => ({ plans }),
  ),
};

export const Multiple: Story = {
  render: renderStory(
    '<Listbox :collection="days" selection-mode="multiple" :default-value="[&quot;mon&quot;, &quot;wed&quot;, &quot;fri&quot;]"><ListboxLabel>Select days</ListboxLabel><ListboxContent><OptionItems :collection="days" /></ListboxContent><ListboxValueText /></Listbox>',
    () => ({ days }),
  ),
};

export const Extended: Story = {
  render: renderStory(
    '<Listbox :collection="days" selection-mode="extended"><ListboxLabel>Hold Cmd or Ctrl to select multiple</ListboxLabel><ListboxContent><OptionItems :collection="days" /></ListboxContent></Listbox>',
    () => ({ days }),
  ),
};

export const Grouped: Story = {
  render: renderStory(
    '<Listbox :collection="regions"><ListboxLabel>Select region</ListboxLabel><ListboxContent><ListboxItemGroup v-for="[region, items] in regions.group()" :id="region" :key="region"><ListboxItemGroupLabel>{{ region }}</ListboxItemGroupLabel><ListboxItem v-for="item in items" :key="item.value" :item="item"><ListboxItemText>{{ item.label }}</ListboxItemText><ListboxItemIndicator /></ListboxItem></ListboxItemGroup></ListboxContent></Listbox>',
    () => ({ regions }),
  ),
};

export const Filtering: Story = {
  render: renderStory(
    '<Listbox :collection="collection" :typeahead="false"><ListboxLabel>Select framework</ListboxLabel><ListboxFilter><ListboxInput placeholder="Search frameworks..." :value="filterText" @input="updateFilter" /><ListboxClearTrigger v-if="filterText" @click="clearFilter" /></ListboxFilter><ListboxContent><OptionItems :collection="collection" /><ListboxEmpty>No frameworks found</ListboxEmpty></ListboxContent></Listbox>',
    () => {
      const filterText = ref('');
      const { collection, filter } = useListCollection<OptionItem>({
        initialItems: frameworkItems,
        filter: (itemText, query) => itemText.toLowerCase().includes(query.toLowerCase()),
      });
      const updateFilter = (event: Event) => {
        filterText.value = (event.target as HTMLInputElement).value;
        filter(filterText.value);
      };
      const clearFilter = () => {
        filterText.value = '';
        filter('');
      };
      return { collection, filterText, updateFilter, clearFilter };
    },
  ),
};

export const StandaloneInput: Story = {
  render: renderStory(
    '<Listbox :collection="collection" :typeahead="false"><ListboxLabel>Select framework</ListboxLabel><ListboxInput placeholder="Filter frameworks" @input="updateFilter" /><ListboxContent><OptionItems :collection="collection" /><ListboxEmpty>No frameworks found</ListboxEmpty></ListboxContent></Listbox>',
    () => {
      const { collection, filter } = useListCollection<OptionItem>({
        initialItems: frameworkItems,
        filter: (itemText, query) => itemText.toLowerCase().includes(query.toLowerCase()),
      });
      return {
        collection,
        updateFilter: (event: Event) => filter((event.target as HTMLInputElement).value),
      };
    },
  ),
};

export const Horizontal: Story = {
  render: renderStory(
    '<Listbox :collection="albums" orientation="horizontal" :class="styles.horizontalRoot"><ListboxLabel>Select album</ListboxLabel><ListboxContent><ListboxItem v-for="item in albums.items" :key="item.title" :item="item"><ListboxItemText><ListboxItemTextContent :class="styles.albumText"><ListboxItemTextLabel>{{ item.title }}</ListboxItemTextLabel><span :class="styles.artist">{{ item.artist }}</span></ListboxItemTextContent></ListboxItemText><ListboxItemIndicator /></ListboxItem></ListboxContent></Listbox>',
    () => ({ albums }),
  ),
};

export const Grid: Story = {
  render: renderStory(
    '<Listbox :collection="colors"><ListboxLabel>Pick a color</ListboxLabel><ListboxContent><ListboxItem v-for="item in colors.items" :key="item.value" :item="item"><ListboxItemText>{{ item.label }}</ListboxItemText></ListboxItem></ListboxContent></Listbox>',
    () => ({ colors }),
  ),
};

export const ItemContext: Story = {
  render: renderStory(
    '<Listbox :collection="countries" :default-value="[&quot;ca&quot;]"><ListboxLabel>Styled country</ListboxLabel><ListboxContent><ListboxItem v-for="item in countries.items" :key="item.value" :item="item"><ListboxItemContext v-slot="context"><ListboxItemText>{{ context.selected ? item.label + " (selected)" : item.label }}</ListboxItemText></ListboxItemContext><ListboxItemIndicator /></ListboxItem></ListboxContent></Listbox>',
    () => ({ countries }),
  ),
};

export const SelectAll: Story = {
  render: renderStory(
    '<Listbox :collection="days" selection-mode="multiple"><ListboxLabel>Select days</ListboxLabel><ListboxContent><OptionItems :collection="days" /></ListboxContent><ListboxContext v-slot="context"><button :class="styles.button" type="button" @click="context.setValue(context.value.length === allValues.length ? [] : allValues)">{{ context.value.length === allValues.length ? "Clear all" : "Select all" }}</button></ListboxContext></Listbox>',
    () => ({ allValues: days.items.map((item) => item.value), days }),
  ),
};

export const CustomStyling: Story = {
  render: renderStory(
    '<Listbox :collection="countries" :default-value="[&quot;ca&quot;]" :class="styles.customRoot"><ListboxLabel :class="styles.customLabel">Styled country</ListboxLabel><ListboxContent :class="styles.customContent"><ListboxItem v-for="item in countries.items" :key="item.value" :item="item" :class="styles.customItem"><ListboxItemText>{{ item.label }}</ListboxItemText><ListboxItemIndicator /></ListboxItem></ListboxContent></Listbox>',
    () => ({ countries }),
  ),
};