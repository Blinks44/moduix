<script setup lang="ts">
import { ListboxContent as ArkListboxContent } from '@ark-ui/vue/listbox';
import type { ListboxContentProps } from '@ark-ui/vue/listbox';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ListboxContentProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkListboxContent
    v-bind="attrs"
    :class="
      cn(
        'box-border flex max-h-56 min-h-0 scroll-py-1 [scrollbar-gutter:stable] flex-col overflow-x-hidden overflow-y-auto overscroll-contain rounded-md border border-border bg-background py-1 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color] duration-200 ease-in-out peer-has-[[data-slot=listbox-input]:focus-visible]/listbox-filter:border-x-ring peer-has-[[data-slot=listbox-input]:focus-visible]/listbox-filter:border-b-ring peer-data-[slot=listbox-filter]/listbox-filter:-mt-3 peer-data-[slot=listbox-filter]/listbox-filter:rounded-t-none focus-visible:outline-ring peer-data-[slot=listbox-filter]/listbox-filter:focus-visible:border-x-ring peer-data-[slot=listbox-filter]/listbox-filter:focus-visible:border-b-ring peer-data-[slot=listbox-filter]/listbox-filter:focus-visible:outline-transparent data-[layout=grid]:grid data-[layout=grid]:grid-cols-[repeat(var(--column-count),minmax(0,1fr))] data-[layout=grid]:gap-1 data-[layout=grid]:p-2 data-[orientation=horizontal]:not-data-[layout=grid]:max-h-none data-[orientation=horizontal]:not-data-[layout=grid]:flex-row data-[orientation=horizontal]:not-data-[layout=grid]:gap-2 data-[orientation=horizontal]:not-data-[layout=grid]:overflow-x-auto data-[orientation=horizontal]:not-data-[layout=grid]:overflow-y-hidden data-[orientation=horizontal]:not-data-[layout=grid]:px-1 motion-reduce:transition-none',
        className,
      )
    "
    data-slot="listbox-content"
  >
    <slot />
  </ArkListboxContent>
</template>