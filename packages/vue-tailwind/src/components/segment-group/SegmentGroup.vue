<script setup lang="ts">
import { SegmentGroupRootProvider as ArkSegmentGroupRootProvider } from '@ark-ui/vue/segment-group';
import type { SegmentGroupRootEmits, SegmentGroupRootProps } from '@ark-ui/vue/segment-group';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import useSegmentGroup from './useSegmentGroup';

defineOptions({ inheritAttrs: false });

export type SegmentGroupSize = 'sm' | 'md' | 'lg';

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
  size?: SegmentGroupSize;
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
  size = 'md',
} = defineProps<Props>();
const emit = defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
// Ark Vue SegmentGroupRoot drops `invalid` and `required`, so the root owns the machine.
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
const rootClass =
  'group/segment-group isolate box-border inline-flex max-w-full gap-1 rounded-lg border border-border bg-muted p-1 text-foreground [--_segment-group-size:var(--moduix-size-md)] data-disabled:opacity-disabled data-invalid:border-destructive data-[orientation=vertical]:flex-col data-[size=lg]:[--_segment-group-size:var(--moduix-size-lg)] data-[size=sm]:[--_segment-group-size:var(--moduix-size-sm)]';
</script>

<template>
  <ArkSegmentGroupRootProvider
    v-bind="attrs"
    :as-child="asChild"
    :class="cn(rootClass, className)"
    :data-size="size"
    :value="segmentGroup"
    data-slot="segment-group-root"
  >
    <slot />
  </ArkSegmentGroupRootProvider>
</template>