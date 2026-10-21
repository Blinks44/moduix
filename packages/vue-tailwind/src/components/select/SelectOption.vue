<script lang="ts">
import type { CollectionItem } from '@ark-ui/vue/collection';
import type { SelectItemProps } from '@ark-ui/vue/select';
import type { HTMLAttributes, VNodeChild } from 'vue';

export interface Props<T extends CollectionItem>
  extends /* @vue-ignore */ Omit<SelectItemProps, 'asChild' | 'children'> {
  class?: HTMLAttributes['class'];
  indicator?: VNodeChild | false;
  item: T;
}
</script>

<script setup lang="ts" generic="T extends CollectionItem">
import { defineComponent, useAttrs } from 'vue';
import SelectItem from './SelectItem.vue';
import SelectItemIndicator from './SelectItemIndicator.vue';
import SelectItemText from './SelectItemText.vue';

defineOptions({ inheritAttrs: false });

const { class: className, indicator = undefined, item } = defineProps<Props<T>>();
defineSlots<{ default?: () => unknown }>();

const VNodeOutlet = defineComponent((props: { value: VNodeChild }) => () => props.value, {
  props: ['value'],
});

const attrs = useAttrs();
</script>

<template>
  <SelectItem :class="className" :item="item" v-bind="attrs">
    <SelectItemText><slot /></SelectItemText>
    <SelectItemIndicator v-if="indicator === undefined" />
    <SelectItemIndicator v-else-if="indicator !== false">
      <VNodeOutlet :value="indicator" />
    </SelectItemIndicator>
  </SelectItem>
</template>