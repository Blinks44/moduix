<script setup lang="ts">
import { createListCollection } from '@ark-ui/vue/collection';
import { Search } from '@lucide/vue';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@moduix/vue/input-group';
import {
  Select,
  SelectContent,
  SelectField,
  SelectLabel,
  SelectOption,
  SelectPositioner,
} from '@moduix/vue/select';
import { computed, nextTick, ref, watch } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import styles from '@/components/examples/select/select-search-in-popup.module.css';

const fruits = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Blueberry', value: 'blueberry' },
  { label: 'Grape', value: 'grape' },
  { label: 'Kiwi', value: 'kiwi' },
  { label: 'Mango', value: 'mango' },
  { label: 'Orange', value: 'orange' },
  { label: 'Pineapple', value: 'pineapple' },
  { label: 'Strawberry', value: 'strawberry' },
  { label: 'Watermelon', value: 'watermelon' },
];
const open = ref(false);
const query = ref('');
const inputRef = ref<ComponentPublicInstance>();
const popupRef = ref<HTMLElement>();
const collection = computed(() =>
  createListCollection({
    items: fruits.filter((item) => item.label.toLowerCase().includes(query.value.toLowerCase())),
  }),
);
watch(open, (value) => {
  if (value) nextTick(() => (inputRef.value?.$el as HTMLInputElement | undefined)?.focus());
  else query.value = '';
});
function updateQuery(event: Event) {
  query.value = (event.target as HTMLInputElement).value;
}
function keepPopupOpen(event: { detail: { target: EventTarget }; preventDefault: () => void }) {
  if (event.detail.target instanceof Node && popupRef.value?.contains(event.detail.target))
    event.preventDefault();
}
</script>

<template>
  <Select
    v-model:open="open"
    :collection="collection"
    lazy-mount
    unmount-on-exit
    @focus-outside="keepPopupOpen"
    @interact-outside="keepPopupOpen"
  >
    <SelectLabel>Choose fruit</SelectLabel>
    <SelectField placeholder="Search or select a fruit" clear-label="Clear selection" />
    <SelectPositioner>
      <div ref="popupRef" :class="styles.popup">
        <div :class="styles.popupHeader">
          <InputGroup>
            <InputGroupAddon>
              <Search aria-hidden="true" />
            </InputGroupAddon>
            <InputGroupInput
              ref="inputRef"
              aria-label="Filter fruits"
              :value="query"
              placeholder="Filter fruits"
              @input="updateQuery"
            />
          </InputGroup>
        </div>
        <SelectContent :class="styles.popupContent">
          <template v-if="collection.items.length"
            ><SelectOption v-for="item in collection.items" :key="item.value" :item="item">{{
              item.label
            }}</SelectOption></template
          >
          <div v-else :class="styles.popupEmpty" role="presentation">No fruits found.</div>
        </SelectContent>
      </div>
    </SelectPositioner>
  </Select>
</template>