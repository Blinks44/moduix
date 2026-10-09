<script setup lang="ts">
import { ComboboxItemGroupLabel as ArkComboboxItemGroupLabel } from '@ark-ui/vue/combobox';
import type { ComboboxItemGroupLabelProps } from '@ark-ui/vue/combobox';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ComboboxItemGroupLabelProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkComboboxItemGroupLabel
    v-bind="attrs"
    :class="
      cn(
        'sticky -top-1 z-1 bg-popover px-2.5 py-1 text-xs font-normal text-muted-foreground',
        className,
      )
    "
    data-slot="combobox-item-group-label"
  >
    <slot />
  </ArkComboboxItemGroupLabel>
</template>