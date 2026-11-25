<script lang="ts">
import type { CollectionItem } from '@ark-ui/vue/collection';
import type { ComboboxRootEmits, ComboboxRootProps } from '@ark-ui/vue/combobox';
import type { HTMLAttributes } from 'vue';

export interface Props<T extends CollectionItem> extends /* @vue-ignore */ ComboboxRootProps<T> {
  class?: HTMLAttributes['class'];
  collection: ComboboxRootProps<T>['collection'];
  closeOnSelect?: boolean;
  disableLayer?: boolean;
  filter?: (inputValue: string) => void;
  inputBehavior?: ComboboxRootProps<T>['inputBehavior'];
  open?: boolean;
  selectionBehavior?: ComboboxRootProps<T>['selectionBehavior'];
}

export interface Emits<T extends CollectionItem> extends /* @vue-ignore */ ComboboxRootEmits<T> {
  inputValueChange: ComboboxRootEmits<T>['inputValueChange'];
  select: ComboboxRootEmits<T>['select'];
}
</script>

<script setup lang="ts" generic="T extends CollectionItem">
import { ComboboxRoot as ArkComboboxRoot } from '@ark-ui/vue/combobox';
import { useDialogContext } from '@ark-ui/vue/dialog';
import { clsx } from 'clsx';
import { onBeforeUnmount, useAttrs, watch } from 'vue';
import styles from './CommandPalette.module.css';

defineOptions({ inheritAttrs: false });

const {
  class: className,
  collection,
  closeOnSelect = true,
  disableLayer = true,
  filter,
  inputBehavior = 'autohighlight',
  open = true,
  selectionBehavior = 'preserve',
} = defineProps<Props<T>>();
const emit = defineEmits<Emits<T>>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const dialog = useDialogContext();

type InputValueChangeDetails = ComboboxRootEmits<T>['inputValueChange'][0];
const handleInputValueChange = (details: InputValueChangeDetails) => {
  filter?.(details.inputValue);
  emit('inputValueChange', details);
};

type SelectDetails = ComboboxRootEmits<T>['select'][0];
const handleSelect = (details: SelectDetails) => {
  emit('select', details);
  if (closeOnSelect) {
    dialog.value.setOpen(false);
  }
};

let wasOpen = dialog.value.open;
watch(
  () => dialog.value.open,
  (isOpen) => {
    if (wasOpen && !isOpen) {
      filter?.('');
    }
    wasOpen = isOpen;
  },
);
onBeforeUnmount(() => {
  if (wasOpen) {
    filter?.('');
  }
});
</script>

<template>
  <ArkComboboxRoot
    v-bind="attrs"
    :collection="collection"
    :class="clsx(styles.combobox, className)"
    :close-on-select="closeOnSelect"
    :disable-layer="disableLayer"
    :input-behavior="inputBehavior"
    :open="open"
    :selection-behavior="selectionBehavior"
    @input-value-change="handleInputValueChange"
    @select="handleSelect"
    data-slot="command-palette-combobox"
  >
    <slot />
  </ArkComboboxRoot>
</template>