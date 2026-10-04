<script lang="ts">
import type { CollectionItem } from '@ark-ui/vue/collection';
import type { ComboboxRootEmits, ComboboxRootProps } from '@ark-ui/vue/combobox';
import type { HTMLAttributes } from 'vue';

export interface Props<T extends CollectionItem> extends /* @vue-ignore */ ComboboxRootProps<T> {
  class?: HTMLAttributes['class'];
  collection: ComboboxRootProps<T>['collection'];
  closeOnSelect?: boolean;
  disableLayer?: boolean;
  inputBehavior?: ComboboxRootProps<T>['inputBehavior'];
  open?: boolean;
  selectionBehavior?: ComboboxRootProps<T>['selectionBehavior'];
}

export interface Emits<T extends CollectionItem> extends /* @vue-ignore */ ComboboxRootEmits<T> {
  select: ComboboxRootEmits<T>['select'];
}
</script>

<script setup lang="ts" generic="T extends CollectionItem">
import { ComboboxRoot as ArkComboboxRoot } from '@ark-ui/vue/combobox';
import { useDialogContext } from '@ark-ui/vue/dialog';
import { useAttrs } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

const {
  class: className,
  collection,
  closeOnSelect = true,
  disableLayer = true,
  inputBehavior = 'autohighlight',
  open = true,
  selectionBehavior = 'preserve',
} = defineProps<Props<T>>();
const emit = defineEmits<Emits<T>>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const dialog = useDialogContext();

type SelectDetails = ComboboxRootEmits<T>['select'][0];
const handleSelect = (details: SelectDetails) => {
  emit('select', details);
  if (closeOnSelect ?? true) {
    dialog.value.setOpen(false);
  }
};
</script>

<template>
  <ArkComboboxRoot
    v-bind="attrs"
    :collection="collection"
    :class="cn('flex min-h-0 flex-1 flex-col overflow-hidden', className)"
    :close-on-select="closeOnSelect ?? true"
    :disable-layer="disableLayer ?? true"
    :input-behavior="inputBehavior ?? 'autohighlight'"
    :open="open ?? true"
    :selection-behavior="selectionBehavior ?? 'preserve'"
    @select="handleSelect"
    data-slot="command-palette-combobox"
  >
    <slot />
  </ArkComboboxRoot>
</template>