<script setup lang="ts">
import { ComboboxItemText as ArkComboboxItemText } from '@ark-ui/vue/combobox';
import type { ComboboxItemTextProps } from '@ark-ui/vue/combobox';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ ComboboxItemTextProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkComboboxItemText
    v-bind="attrs"
    :class="cn('grid min-w-0 gap-1', className)"
    data-slot="command-palette-item-text"
  >
    <slot />
  </ArkComboboxItemText>
</template>