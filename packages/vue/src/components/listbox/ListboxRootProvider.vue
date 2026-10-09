<script lang="ts">
import type { CollectionItem } from '@ark-ui/vue/collection';
import type { ListboxRootProviderProps } from '@ark-ui/vue/listbox';
import type { HTMLAttributes } from 'vue';

export interface Props<T extends CollectionItem>
  extends /* @vue-ignore */ ListboxRootProviderProps<T> {
  class?: HTMLAttributes['class'];
  value: ListboxRootProviderProps<T>['value'];
}
</script>

<script setup lang="ts" generic="T extends CollectionItem">
import { ListboxRootProvider as ArkListboxRootProvider } from '@ark-ui/vue/listbox';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import styles from './Listbox.module.css';

defineOptions({ inheritAttrs: false });

const { class: className, value } = defineProps<Props<T>>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkListboxRootProvider
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :value="value"
    data-slot="listbox-root-provider"
  >
    <slot />
  </ArkListboxRootProvider>
</template>