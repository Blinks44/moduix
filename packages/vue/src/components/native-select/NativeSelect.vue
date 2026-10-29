<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import { useFieldContext } from '@ark-ui/vue/field';
import type { FieldSelectProps } from '@ark-ui/vue/field';
import { useForwardExpose } from '@ark-ui/vue/utils';
import { clsx } from 'clsx';
import { computed, mergeProps, unref, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui';
import styles from './NativeSelect.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FieldSelectProps {
  class?: HTMLAttributes['class'];
  controlProps?: HTMLAttributes;
  modelValue?: FieldSelectProps['modelValue'];
}

export interface Emits {
  'update:modelValue': [value: FieldSelectProps['modelValue']];
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const { forwardRef } = useForwardExpose();
const field = useFieldContext();
// Ark's FieldSelect always binds `value`, and Vue clears native `selected` options when it is
// undefined, so the value is bound only for a controlled select.
const selectProps = computed(() =>
  mergeProps(
    unref(field)?.getSelectProps() ?? {},
    props.modelValue === undefined ? {} : { value: props.modelValue },
  ),
);
const handleChange = (event: Event) =>
  emit('update:modelValue', (event.target as HTMLSelectElement).value);
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
    <ark.select
      :ref="forwardRef"
      v-bind="mergeProps(selectProps, attrs)"
      :class="clsx(styles.root, props.class)"
      data-scope="field"
      data-part="select"
      data-slot="native-select-root"
      @change="handleChange"
    >
      <slot />
    </ark.select>
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