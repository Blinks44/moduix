<script setup lang="ts">
import { SegmentGroupItemHiddenInput } from '@ark-ui/vue/segment-group';
import type { VNodeChild } from 'vue';
import { computed, defineComponent } from 'vue';
import SegmentGroupItem from './SegmentGroupItem.vue';
import SegmentGroupItemText from './SegmentGroupItemText.vue';

export interface SegmentGroupItemOption {
  value: string;
  label: VNodeChild;
  disabled?: boolean;
}

export interface Props {
  items: readonly (string | SegmentGroupItemOption)[];
}

const { items } = defineProps<Props>();
const options = computed<SegmentGroupItemOption[]>(() =>
  items.map((item) => (typeof item === 'string' ? { value: item, label: item } : item)),
);

const VNodeOutlet = defineComponent((props: { value: VNodeChild }) => () => props.value, {
  props: ['value'],
});
</script>

<template>
  <SegmentGroupItem
    v-for="item in options"
    :key="item.value"
    :disabled="item.disabled"
    :value="item.value"
  >
    <SegmentGroupItemText><VNodeOutlet :value="item.label" /></SegmentGroupItemText>
    <SegmentGroupItemHiddenInput />
  </SegmentGroupItem>
</template>