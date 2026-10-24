<script setup lang="ts">
import { ComboboxItem as ArkComboboxItem } from '@ark-ui/vue/combobox';
import type { ComboboxItemProps } from '@ark-ui/vue/combobox';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ComboboxItemProps {
  class?: HTMLAttributes['class'];
  item: ComboboxItemProps['item'];
}

const { class: className, item } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkComboboxItem
    v-bind="attrs"
    :class="
      cn(
        'flex min-h-control-sm cursor-default items-center gap-3 rounded-md px-3 py-1 text-sm leading-5 outline-0 select-none data-disabled:pointer-events-none data-disabled:opacity-disabled data-highlighted:bg-accent data-highlighted:text-accent-foreground',
        className,
      )
    "
    :item="item"
    data-slot="command-palette-item"
  >
    <slot />
  </ArkComboboxItem>
</template>