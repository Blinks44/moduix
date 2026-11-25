<script lang="ts">
import type {
  SelectClearTriggerProps,
  SelectControlProps,
  SelectTriggerProps,
  SelectValueTextProps,
} from '@ark-ui/vue/select';
import { defineComponent } from 'vue';
import type { HTMLAttributes, VNodeChild } from 'vue';

export interface Props extends /* @vue-ignore */ Omit<SelectControlProps, 'asChild' | 'children'> {
  class?: HTMLAttributes['class'];
  clearable?: boolean;
  clearLabel?: string;
  clearTriggerProps?: SelectClearTriggerProps;
  indicator?: VNodeChild;
  placeholder?: SelectValueTextProps['placeholder'];
  triggerProps?: SelectTriggerProps;
  valueTextProps?: SelectValueTextProps;
}

const VNodeOutlet = defineComponent((props: { value: VNodeChild }) => () => props.value, {
  props: ['value'],
});
</script>

<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import SelectClearTrigger from './SelectClearTrigger.vue';
import SelectControl from './SelectControl.vue';
import SelectIndicator from './SelectIndicator.vue';
import SelectTrigger from './SelectTrigger.vue';
import SelectValueText from './SelectValueText.vue';

defineOptions({ inheritAttrs: false });

const {
  class: className,
  clearable = undefined,
  clearLabel,
  clearTriggerProps,
  indicator = undefined,
  placeholder,
  triggerProps,
  valueTextProps,
} = defineProps<Props>();

const attrs = useAttrs();
const showClearTrigger = computed(
  () => clearable ?? (clearLabel != null || clearTriggerProps != null),
);
const resolvedValueTextProps = computed(() => ({
  ...(placeholder === undefined ? {} : { placeholder }),
  ...valueTextProps,
}));
const resolvedClearTriggerProps = computed(() => ({
  ...(clearLabel === undefined ? {} : { 'aria-label': clearLabel }),
  ...clearTriggerProps,
}));
</script>

<template>
  <SelectControl v-bind="attrs" :class="className">
    <SelectTrigger v-bind="triggerProps">
      <SelectValueText v-bind="resolvedValueTextProps" />
    </SelectTrigger>
    <SelectClearTrigger v-if="showClearTrigger" v-bind="resolvedClearTriggerProps" />
    <SelectIndicator v-if="indicator === undefined" />
    <SelectIndicator v-else><VNodeOutlet :value="indicator" /></SelectIndicator>
  </SelectControl>
</template>