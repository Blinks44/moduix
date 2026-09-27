<script setup lang="ts">
import { FieldSelect as ArkFieldSelect } from '@ark-ui/vue/field';
import type { FieldSelectProps } from '@ark-ui/vue/field';
import { useForwardExpose } from '@ark-ui/vue/utils';
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './NativeSelect.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FieldSelectProps {
  class?: HTMLAttributes['class'];
  controlProps?: HTMLAttributes;
}

export interface Emits {
  'update:modelValue': [value: FieldSelectProps['modelValue']];
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const { forwardRef } = useForwardExpose();
const controlAttrs = computed(() => {
  const { class: _class, ...rest } = props.controlProps ?? {};
  return rest;
});
</script>

<template>
  <span
    v-bind="controlAttrs"
    :class="clsx(styles.control, props.controlProps?.class)"
    data-scope="native-select"
    data-part="control"
    data-slot="native-select-control"
  >
    <ArkFieldSelect
      :ref="forwardRef"
      v-bind="attrs"
      :class="clsx(styles.root, props.class)"
      data-scope="field"
      data-part="select"
      data-slot="native-select-root"
      @update:model-value="emit('update:modelValue', $event)"
    >
      <slot />
    </ArkFieldSelect>
    <span
      aria-hidden="true"
      data-scope="native-select"
      data-part="indicator"
      data-slot="native-select-indicator"
      :class="styles.indicator"
    >
      <ChevronDownIcon />
    </span>
  </span>
</template>