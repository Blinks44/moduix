<script lang="ts">
import type { CollectionItem } from '@ark-ui/vue/collection';
import type { ListboxItemProps } from '@ark-ui/vue/listbox';
import type { HTMLAttributes } from 'vue';

export interface Props<T extends CollectionItem>
  extends /* @vue-ignore */ Omit<ListboxItemProps, 'item'> {
  class?: HTMLAttributes['class'];
  item: T;
}
</script>

<script setup lang="ts" generic="T extends CollectionItem">
import { ListboxItem as ArkListboxItem } from '@ark-ui/vue/listbox';
import { useAttrs } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

const { class: className, item } = defineProps<Props<T>>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkListboxItem
    v-bind="attrs"
    :class="
      cn(
        'mx-1 grid min-h-control-sm cursor-pointer grid-cols-[minmax(0,1fr)_1rem] items-center gap-2 rounded-sm px-3 py-1 text-sm leading-5 outline-0 transition-[background-color,color] duration-normal ease-in-out select-none data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-disabled data-highlighted:bg-accent data-highlighted:text-accent-foreground data-[layout=grid]:mx-0 data-[layout=grid]:min-w-0 data-[layout=grid]:grid-cols-1 data-[layout=grid]:justify-items-center data-[layout=grid]:text-center data-[layout=grid]:data-selected:bg-muted data-[layout=grid]:data-selected:text-foreground data-[orientation=horizontal]:not-data-[layout=grid]:w-44 data-[orientation=horizontal]:not-data-[layout=grid]:min-w-44 data-[orientation=horizontal]:not-data-[layout=grid]:items-start [:is([data-slot=listbox-root],[data-slot=listbox-root-provider])[data-disabled]_&]:opacity-100 [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-accent [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-accent-foreground',
        className,
      )
    "
    :item="item"
    data-slot="listbox-item"
  >
    <slot />
  </ArkListboxItem>
</template>