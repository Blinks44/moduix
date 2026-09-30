<script setup lang="ts">
import { SegmentGroupRootProvider as ArkSegmentGroupRootProvider } from '@ark-ui/vue/segment-group';
import type { SegmentGroupRootEmits, SegmentGroupRootProps } from '@ark-ui/vue/segment-group';
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './SegmentGroup.module.css';
import useSegmentGroup from './useSegmentGroup';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SegmentGroupRootProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
  defaultValue?: string;
  disabled?: boolean;
  form?: SegmentGroupRootProps['form'];
  id?: SegmentGroupRootProps['id'];
  ids?: SegmentGroupRootProps['ids'];
  invalid?: boolean;
  modelValue?: string | null;
  name?: string;
  orientation?: 'horizontal' | 'vertical';
  readOnly?: boolean;
  required?: boolean;
}

export interface Emits extends /* @vue-ignore */ SegmentGroupRootEmits {}

const {
  asChild = undefined,
  class: className,
  defaultValue,
  disabled = undefined,
  form,
  id,
  ids,
  invalid = undefined,
  modelValue,
  name,
  orientation = 'horizontal',
  readOnly = undefined,
  required = undefined,
} = defineProps<Props>();
const emit = defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const segmentGroup = useSegmentGroup(
  computed(() => ({
    defaultValue,
    disabled,
    form,
    id,
    ids,
    invalid,
    modelValue,
    name,
    orientation,
    readOnly,
    required,
  })),
  emit,
);
</script>

<template>
  <ArkSegmentGroupRootProvider
    v-bind="attrs"
    :as-child="asChild"
    :class="clsx(styles.root, className)"
    :value="segmentGroup"
    data-slot="segment-group-root"
  >
    <slot />
  </ArkSegmentGroupRootProvider>
</template>