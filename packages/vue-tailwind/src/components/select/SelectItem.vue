<script lang="ts">
import type { CollectionItem } from '@ark-ui/vue/collection';
import type { SelectItemProps } from '@ark-ui/vue/select';
import type { HTMLAttributes } from 'vue';

export interface Props<T extends CollectionItem>
  extends /* @vue-ignore */ Omit<SelectItemProps, 'item'> {
  class?: HTMLAttributes['class'];
  item: T;
}
</script>

<script setup lang="ts" generic="T extends CollectionItem">
import { SelectItem as ArkSelectItem } from '@ark-ui/vue/select';
import { useAttrs } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

const { class: className, item } = defineProps<Props<T>>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSelectItem
    v-bind="attrs"
    :class="
      cn(
        'relative mx-1 flex min-h-control-sm w-[calc(100%-0.5rem)] cursor-default items-center justify-between gap-2 rounded-sm bg-transparent px-3 py-1 text-sm text-popover-foreground outline-0 select-none data-disabled:pointer-events-none data-disabled:text-muted-foreground data-disabled:opacity-50 data-highlighted:bg-accent data-highlighted:text-accent-foreground',
        className,
      )
    "
    :item="item"
    data-slot="select-item"
  >
    <slot />
  </ArkSelectItem>
</template>