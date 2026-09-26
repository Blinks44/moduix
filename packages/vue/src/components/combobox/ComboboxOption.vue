<script lang="ts">
import type { CollectionItem } from '@ark-ui/vue/collection';
import type { ComboboxItemProps } from '@ark-ui/vue/combobox';
import type { HTMLAttributes, VNodeChild } from 'vue';

export interface Props<T extends CollectionItem>
  extends /* @vue-ignore */ Omit<ComboboxItemProps, 'asChild' | 'children'> {
  class?: HTMLAttributes['class'];
  indicator?: VNodeChild | false;
  item: T;
}
</script>

<script setup lang="ts" generic="T extends CollectionItem">
import { defineComponent, useAttrs } from 'vue';
import ComboboxItem from './ComboboxItem.vue';
import ComboboxItemIndicator from './ComboboxItemIndicator.vue';
import ComboboxItemText from './ComboboxItemText.vue';

defineOptions({ inheritAttrs: false });

const { class: className, indicator, item } = defineProps<Props<T>>();
defineSlots<{ default?: () => unknown }>();

const VNodeOutlet = defineComponent((props: { value: VNodeChild }) => () => props.value, {
  props: ['value'],
});

const attrs = useAttrs();
</script>

<template>
  <ComboboxItem :class="className" :item="item" v-bind="attrs">
    <ComboboxItemText><slot /></ComboboxItemText>
    <ComboboxItemIndicator v-if="indicator === undefined" />
    <ComboboxItemIndicator v-else-if="indicator !== false">
      <VNodeOutlet :value="indicator" />
    </ComboboxItemIndicator>
  </ComboboxItem>
</template>