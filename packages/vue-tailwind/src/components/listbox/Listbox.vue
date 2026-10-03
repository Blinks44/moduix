<script lang="ts">
import type { CollectionItem } from '@ark-ui/vue/collection';
import type { ListboxRootEmits, ListboxRootProps } from '@ark-ui/vue/listbox';
import type { HTMLAttributes } from 'vue';

export interface Props<T extends CollectionItem> extends /* @vue-ignore */ ListboxRootProps<T> {
  class?: HTMLAttributes['class'];
  collection: ListboxRootProps<T>['collection'];
}

export interface Emits<T extends CollectionItem> extends /* @vue-ignore */ ListboxRootEmits<T> {}
</script>

<script setup lang="ts" generic="T extends CollectionItem">
import { ListboxRoot as ArkListboxRoot } from '@ark-ui/vue/listbox';
import { useAttrs } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { listboxRootVariants } from './Listbox.variants';

defineOptions({ inheritAttrs: false });

const { class: className, collection } = defineProps<Props<T>>();
defineEmits<Emits<T>>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkListboxRoot
    v-bind="attrs"
    :class="cn(listboxRootVariants(), className)"
    :collection="collection"
    data-slot="listbox-root"
  >
    <slot />
  </ArkListboxRoot>
</template>