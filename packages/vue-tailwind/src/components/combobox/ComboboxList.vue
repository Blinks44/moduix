<script setup lang="ts">
import { ComboboxList as ArkComboboxList } from '@ark-ui/vue/combobox';
import type { ComboboxListProps } from '@ark-ui/vue/combobox';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ComboboxListProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkComboboxList
    v-bind="attrs"
    :class="cn('flex min-h-0 flex-col outline-0 data-empty:hidden', className)"
    data-slot="combobox-list"
  >
    <slot />
  </ArkComboboxList>
</template>