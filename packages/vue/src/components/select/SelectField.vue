<script setup lang="ts">
import type { SelectControlProps, SelectValueTextProps } from '@ark-ui/vue/select';
import { defineComponent, useAttrs } from 'vue';
import type { HTMLAttributes, VNodeChild } from 'vue';
import SelectClearTrigger from './SelectClearTrigger.vue';
import SelectControl from './SelectControl.vue';
import SelectIndicator from './SelectIndicator.vue';
import SelectTrigger from './SelectTrigger.vue';
import SelectValueText from './SelectValueText.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ Omit<SelectControlProps, 'asChild' | 'children'> {
  class?: HTMLAttributes['class'];
  clearLabel?: string;
  indicator?: VNodeChild;
  placeholder?: SelectValueTextProps['placeholder'];
}

const { class: className, clearLabel, indicator = undefined, placeholder } = defineProps<Props>();

const VNodeOutlet = defineComponent((props: { value: VNodeChild }) => () => props.value, {
  props: ['value'],
});

const attrs = useAttrs();
</script>

<template>
  <SelectControl v-bind="attrs" :class="className">
    <SelectTrigger>
      <SelectValueText :placeholder="placeholder" />
    </SelectTrigger>
    <SelectClearTrigger v-if="clearLabel" :aria-label="clearLabel" />
    <SelectIndicator v-if="indicator === undefined" />
    <SelectIndicator v-else><VNodeOutlet :value="indicator" /></SelectIndicator>
  </SelectControl>
</template>