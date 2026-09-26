<script setup lang="ts">
import { ComboboxItemText as ArkComboboxItemText } from '@ark-ui/vue/combobox';
import type { ComboboxItemTextProps } from '@ark-ui/vue/combobox';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ComboboxItemTextProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkComboboxItemText
    v-bind="attrs"
    :class="cn('min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap', className)"
    data-slot="combobox-item-text"
  >
    <slot />
  </ArkComboboxItemText>
</template>