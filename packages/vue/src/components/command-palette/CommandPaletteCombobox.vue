<script lang="ts">
import type { CollectionItem } from '@ark-ui/vue/collection';
import type { ComboboxRootEmits, ComboboxRootProps } from '@ark-ui/vue/combobox';
import type { HTMLAttributes } from 'vue';

export interface Props<T extends CollectionItem> extends /* @vue-ignore */ ComboboxRootProps<T> {
  class?: HTMLAttributes['class'];
  closeOnSelect?: boolean;
  disableLayer?: boolean;
  inputBehavior?: ComboboxRootProps<T>['inputBehavior'];
  open?: boolean;
  selectionBehavior?: ComboboxRootProps<T>['selectionBehavior'];
}

export interface Emits<T extends CollectionItem> {
  exitComplete: ComboboxRootEmits<T>['exitComplete'];
  focusOutside: ComboboxRootEmits<T>['focusOutside'];
  highlightChange: ComboboxRootEmits<T>['highlightChange'];
  inputValueChange: ComboboxRootEmits<T>['inputValueChange'];
  interactOutside: ComboboxRootEmits<T>['interactOutside'];
  openChange: ComboboxRootEmits<T>['openChange'];
  pointerDownOutside: ComboboxRootEmits<T>['pointerDownOutside'];
  select: ComboboxRootEmits<T>['select'];
  valueChange: ComboboxRootEmits<T>['valueChange'];
  'update:modelValue': ComboboxRootEmits<T>['update:modelValue'];
  'update:highlightedValue': ComboboxRootEmits<T>['update:highlightedValue'];
  'update:inputValue': ComboboxRootEmits<T>['update:inputValue'];
  'update:open': ComboboxRootEmits<T>['update:open'];
}
</script>

<script setup lang="ts" generic="T extends CollectionItem">
import { ComboboxRoot as ArkComboboxRoot } from '@ark-ui/vue/combobox';
import { useDialogContext } from '@ark-ui/vue/dialog';
import { useForwardPropsEmits } from '@ark-ui/vue/utils';
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import styles from './CommandPalette.module.css';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props<T>>(), {
  closeOnSelect: undefined,
  disableLayer: undefined,
  inputBehavior: undefined,
  open: undefined,
  selectionBehavior: undefined,
});
const emit = defineEmits<Emits<T>>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const dialog = useDialogContext();
const className = computed(() => props.class);
const closeOnSelect = computed(() => props.closeOnSelect ?? true);
const disableLayer = computed(() => props.disableLayer ?? true);
const inputBehavior = computed(() => props.inputBehavior ?? 'autohighlight');
const open = computed(() => props.open ?? true);
const selectionBehavior = computed(() => props.selectionBehavior ?? 'preserve');
const rootProps = computed(() => {
  const {
    class: _class,
    closeOnSelect: _closeOnSelect,
    disableLayer: _disableLayer,
    inputBehavior: _inputBehavior,
    open: _open,
    selectionBehavior: _selectionBehavior,
    ...rest
  } = props;
  return rest;
});
const forwardedProps = useForwardPropsEmits(rootProps, emit);
const arkProps = computed(() => {
  const { onSelect: _onSelect, ...rest } = forwardedProps.value;
  return rest;
});

type SelectDetails = ComboboxRootEmits<T>['select'][0];
const handleSelect = (details: SelectDetails) => {
  emit('select', details);
  if (closeOnSelect.value) {
    dialog.value.setOpen(false);
  }
};
</script>

<template>
  <ArkComboboxRoot
    v-bind="{ ...attrs, ...arkProps }"
    :class="clsx(styles.combobox, className)"
    :close-on-select="closeOnSelect"
    :disable-layer="disableLayer"
    :input-behavior="inputBehavior"
    :open="open"
    :selection-behavior="selectionBehavior"
    @select="handleSelect"
    data-slot="command-palette-combobox"
  >
    <slot />
  </ArkComboboxRoot>
</template>