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
import { useAttrs } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

const { class: className, value } = defineProps<Props<T>>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkListboxRootProvider
    v-bind="attrs"
    :class="
      cn(
        'box-border flex w-64 max-w-full min-w-0 flex-col gap-3 text-foreground data-disabled:opacity-50',
        className,
      )
    "
    :value="value"
    data-slot="listbox-root-provider"
  >
    <slot />
  </ArkListboxRootProvider>
</template>