<script setup lang="ts">
import { DatePickerRoot as ArkDatePickerRoot } from '@ark-ui/vue/date-picker';
import type { DatePickerRootEmits, DatePickerRootProps } from '@ark-ui/vue/date-picker';
import { useFieldContext } from '@ark-ui/vue/field';
import { useFieldsetContext } from '@ark-ui/vue/fieldset';
import { clsx } from 'clsx';
import { computed, provide, unref, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import type { PortalRef } from '@/internal/overlayPortal/context';
import { OverlayPortalContextKey } from '@/internal/overlayPortal/context';
import styles from './DatePicker.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerRootProps {
  class?: HTMLAttributes['class'];
  disabled?: boolean;
  invalid?: boolean;
  lazyMount?: boolean;
  portalled?: boolean;
  portalRef?: PortalRef;
  readOnly?: boolean;
  required?: boolean;
  unmountOnExit?: boolean;
}

export interface Emits extends /* @vue-ignore */ DatePickerRootEmits {}

const {
  class: className,
  disabled = undefined,
  invalid = undefined,
  lazyMount = true,
  portalled = true,
  portalRef,
  readOnly = undefined,
  required = undefined,
  unmountOnExit = true,
} = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const field = useFieldContext();
const fieldset = useFieldsetContext();

const resolvedDisabled = computed(() => {
  const value = disabled ?? unref(field)?.disabled ?? unref(fieldset)?.disabled;
  return value === true || value === 'true'
    ? true
    : value === false || value === 'false'
      ? false
      : undefined;
});
const resolvedInvalid = computed(
  () => invalid ?? unref(field)?.invalid ?? unref(fieldset)?.invalid,
);
const resolvedReadOnly = computed(() => readOnly ?? unref(field)?.readOnly);
const resolvedRequired = computed(() => required ?? unref(field)?.required);

provide(OverlayPortalContextKey, {
  portalled: () => portalled,
  portalRef: () => portalRef,
});
</script>

<template>
  <ArkDatePickerRoot
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :disabled="resolvedDisabled"
    :invalid="resolvedInvalid"
    :lazy-mount="lazyMount"
    :read-only="resolvedReadOnly"
    :required="resolvedRequired"
    :unmount-on-exit="unmountOnExit"
    data-slot="date-picker-root"
  >
    <slot />
  </ArkDatePickerRoot>
</template>