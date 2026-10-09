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
        'relative mx-1 box-border flex min-h-control-sm w-[calc(100%-0.5rem)] cursor-default items-center justify-between gap-2 rounded-sm border-0 bg-transparent px-3 py-1 text-sm text-popover-foreground outline-0 select-none data-disabled:pointer-events-none data-disabled:text-muted-foreground data-disabled:opacity-50 data-highlighted:bg-accent data-highlighted:text-accent-foreground data-[state=checked]:text-popover-foreground',
        className,
      )
    "
    :item="item"
    data-slot="combobox-item"
  >
    <slot />
  </ArkComboboxItem>
</template>