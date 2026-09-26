import { createListCollection, useListCollection } from '@ark-ui/vue/collection';
import { useFilter } from '@ark-ui/vue/locale';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { computed, defineComponent, onBeforeUnmount, ref, watch } from 'vue';
import type { Component, PropType } from 'vue';
import {
  Combobox,
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
  useCombobox,
} from '@/components/combobox';
import styles from './Combobox.stories.module.css';

const meta = {
  title: 'Components/Combobox',
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

type Item = { label: string; value: string };
type GroupedItem = Item & { continent: string };

const fruits: Item[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Grape', value: 'grape' },
  { label: 'Kiwi', value: 'kiwi' },
  { label: 'Mango', value: 'mango' },
  { label: 'Orange', value: 'orange' },
  { label: 'Pineapple', value: 'pineapple' },
  { label: 'Strawberry', value: 'strawberry' },
];

const comboboxComponents = {
  Combobox,
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
} as unknown as Record<string, Component>;

const ComboboxPopup = defineComponent({
  components: comboboxComponents,
  props: {
    items: { type: Array as PropType<readonly Item[]>, required: true },
  },
  template: `<ComboboxPositioner><ComboboxContent><ComboboxEmpty>No options found.</ComboboxEmpty><ComboboxList><ComboboxOption v-for="item in items" :key="item.value" :item="item">{{ item.label }}</ComboboxOption></ComboboxList></ComboboxContent></ComboboxPositioner>`,
});

const storyComponents = { ...comboboxComponents, ComboboxPopup };

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

function createFilteredCollection(initialItems: Item[]) {
  const filterOptions = useFilter({ sensitivity: 'base' });
  return useListCollection({
    initialItems,
    filter: (itemText, filterText) => filterOptions.value.contains(itemText, filterText),
  });
}

export const Basic: Story = {
  render: renderStory(
    `
      <Combobox :collection="collection" @input-value-change="filter($event.inputValue)">
        <ComboboxLabel>Choose fruit</ComboboxLabel>
        <ComboboxControl>
          <ComboboxInput placeholder="e.g. Mango" />
          <ComboboxClearTrigger aria-label="Clear selection" />
          <ComboboxTrigger aria-label="Open options" />
        </ComboboxControl>
        <ComboboxPopup :items="collection.items" />
      </Combobox>
    `,
    () => {
      const state = createFilteredCollection(fruits);
      return { collection: state.collection, filter: state.filter };
    },
  ),
};

export const Controlled: Story = {
  render: renderStory(
    `
      <Combobox v-model="value" :collection="collection" @input-value-change="filter($event.inputValue)">
        <ComboboxLabel>Choose fruit</ComboboxLabel>
        <ComboboxControl>
          <ComboboxInput />
          <ComboboxClearTrigger aria-label="Clear selection" />
          <ComboboxTrigger aria-label="Open options" />
        </ComboboxControl>
        <ComboboxPopup :items="collection.items" />
      </Combobox>
    `,
    () => {
      const state = createFilteredCollection(fruits);
      return { collection: state.collection, filter: state.filter, value: ref(['mango']) };
    },
  ),
};

export const Grouped: Story = {
  render: renderStory(
    `
      <Combobox :collection="collection" @input-value-change="filter($event.inputValue)">
        <ComboboxLabel>Country</ComboboxLabel>
        <ComboboxControl>
          <ComboboxInput placeholder="e.g. Canada" />
          <ComboboxClearTrigger aria-label="Clear selection" />
          <ComboboxTrigger aria-label="Open options" />
        </ComboboxControl>
        <ComboboxPositioner>
          <ComboboxContent>
            <ComboboxEmpty>No countries found.</ComboboxEmpty>
            <ComboboxItemGroup v-for="([continent, items]) in collection.group()" :key="continent">
              <ComboboxItemGroupLabel>{{ continent }}</ComboboxItemGroupLabel>
              <ComboboxOption v-for="item in items" :key="item.value" :item="item">{{ item.label }}</ComboboxOption>
            </ComboboxItemGroup>
          </ComboboxContent>
        </ComboboxPositioner>
      </Combobox>
    `,
    () => {
      const filterOptions = useFilter({ sensitivity: 'base' });
      const state = useListCollection({
        initialItems: [
          { label: 'Canada', value: 'ca', continent: 'North America' },
          { label: 'United States', value: 'us', continent: 'North America' },
          { label: 'Germany', value: 'de', continent: 'Europe' },
          { label: 'France', value: 'fr', continent: 'Europe' },
          { label: 'Japan', value: 'jp', continent: 'Asia' },
          { label: 'South Korea', value: 'kr', continent: 'Asia' },
        ] satisfies GroupedItem[],
        filter: (itemText, filterText) => filterOptions.value.contains(itemText, filterText),
        groupBy: (item) => item.continent,
      });
      return { collection: state.collection, filter: state.filter };
    },
  ),
};

export const Multiple: Story = {
  render: renderStory(
    `
      <Combobox v-model="value" multiple :collection="collection" @input-value-change="filter($event.inputValue)">
        <ComboboxLabel>Fruits</ComboboxLabel>
        <div :class="styles.tags">
          <span v-if="selectedItems.length === 0" :class="styles.tagPlaceholder">None selected</span>
          <span v-for="item in selectedItems" :key="item.value" :class="styles.tag">{{ item.label }}</span>
        </div>
        <ComboboxControl>
          <ComboboxInput placeholder="Search fruits" />
          <ComboboxTrigger aria-label="Open options" />
        </ComboboxControl>
        <ComboboxPopup :items="collection.items" />
      </Combobox>
    `,
    () => {
      const state = createFilteredCollection(fruits);
      const value = ref<string[]>([]);
      return {
        collection: state.collection,
        filter: state.filter,
        selectedItems: computed(() => fruits.filter((item) => value.value.includes(item.value))),
        value,
      };
    },
  ),
};

export const AsyncSearch: Story = {
  render: renderStory(
    `
      <Combobox :collection="collection" :input-value="inputValue" @input-value-change="inputValue = $event.inputValue">
        <ComboboxLabel>Async-style search</ComboboxLabel>
        <ComboboxControl>
          <ComboboxInput placeholder="Start typing" />
          <ComboboxClearTrigger aria-label="Clear search" />
          <ComboboxTrigger aria-label="Open options" />
        </ComboboxControl>
        <ComboboxPositioner>
          <ComboboxContent>
            <ComboboxStatus v-if="!inputValue">Start typing to search…</ComboboxStatus>
            <ComboboxStatus v-if="loading">Searching…</ComboboxStatus>
            <ComboboxEmpty v-if="!loading && inputValue">No options found.</ComboboxEmpty>
            <ComboboxList><ComboboxOption v-for="item in collection.items" :key="item.value" :item="item">{{ item.label }}</ComboboxOption></ComboboxList>
          </ComboboxContent>
        </ComboboxPositioner>
      </Combobox>
    `,
    () => {
      const inputValue = ref('');
      const loading = ref(false);
      const items = ref<Item[]>([]);
      const state = useListCollection<Item>({ initialItems: [] });
      const timeout = ref<number>();
      watch(inputValue, (value) => {
        if (timeout.value !== undefined) window.clearTimeout(timeout.value);
        if (!value) {
          items.value = [];
          loading.value = false;
          state.set([]);
          return;
        }
        loading.value = true;
        timeout.value = window.setTimeout(() => {
          items.value = fruits.filter((item) =>
            item.label.toLowerCase().includes(value.toLowerCase()),
          );
          state.set(items.value);
          loading.value = false;
        }, 300);
      });
      onBeforeUnmount(() => {
        if (timeout.value !== undefined) window.clearTimeout(timeout.value);
      });
      return { collection: state.collection, inputValue, loading };
    },
  ),
};

const jobTitles = createListCollection({
  items: [
    { label: 'Designer', value: 'designer' },
    { label: 'Developer', value: 'developer' },
    { label: 'Product Manager', value: 'product-manager' },
  ],
});

export const RootProvider: Story = {
  render: renderStory(
    `
      <div :class="styles.providerLayout">
        <button type="button" :class="styles.providerButton" @click="focusCombobox">Focus combobox</button>
        <ComboboxRootProvider :value="combobox">
          <ComboboxLabel>Job title</ComboboxLabel>
          <ComboboxControl>
            <ComboboxInput />
            <ComboboxClearTrigger aria-label="Clear selection" />
            <ComboboxTrigger aria-label="Open options" />
          </ComboboxControl>
          <ComboboxPopup :items="jobTitles.items" />
        </ComboboxRootProvider>
      </div>
    `,
    () => {
      const combobox = useCombobox({ collection: jobTitles });
      return { combobox, focusCombobox: () => combobox.value.focus(), jobTitles };
    },
  ),
};