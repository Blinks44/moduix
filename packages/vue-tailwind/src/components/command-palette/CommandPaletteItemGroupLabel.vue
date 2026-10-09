<script setup lang="ts">
import { ComboboxItemGroupLabel as ArkComboboxItemGroupLabel } from '@ark-ui/vue/combobox';
import type { ComboboxItemGroupLabelProps } from '@ark-ui/vue/combobox';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ ComboboxItemGroupLabelProps {
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
        'sticky top-0 z-1 block bg-popover px-3 py-1 text-xs leading-4 font-normal text-muted-foreground',
        className,
      )
    "
    data-slot="command-palette-item-group-label"
  >
    <slot />
  </ArkComboboxItemGroupLabel>
</template>