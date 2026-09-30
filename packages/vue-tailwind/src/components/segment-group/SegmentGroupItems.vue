<script setup lang="ts">
import type { VNodeChild } from 'vue';
import { defineComponent } from 'vue';
import SegmentGroupItem from './SegmentGroupItem.vue';
import SegmentGroupItemControl from './SegmentGroupItemControl.vue';
import SegmentGroupItemHiddenInput from './SegmentGroupItemHiddenInput.vue';
import SegmentGroupItemText from './SegmentGroupItemText.vue';

export interface SegmentGroupItemOption {
  value: string;
  label: VNodeChild;
  disabled?: boolean;
}

export interface Props {
  items: readonly SegmentGroupItemOption[];
}

const { items } = defineProps<Props>();

const VNodeOutlet = defineComponent((props: { value: VNodeChild }) => () => props.value, {
  props: ['value'],
});
</script>

<template>
  <SegmentGroupItem
    v-for="item in items"
    :key="item.value"
    :disabled="item.disabled"
    :value="item.value"
  >
    <SegmentGroupItemText><VNodeOutlet :value="item.label" /></SegmentGroupItemText>
    <SegmentGroupItemControl />
    <SegmentGroupItemHiddenInput />
  </SegmentGroupItem>
</template>