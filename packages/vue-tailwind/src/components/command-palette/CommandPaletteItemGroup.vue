<script setup lang="ts">
import { ComboboxItemGroup as ArkComboboxItemGroup } from '@ark-ui/vue/combobox';
import type { ComboboxItemGroupProps } from '@ark-ui/vue/combobox';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ ComboboxItemGroupProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkComboboxItemGroup
    v-bind="attrs"
    :class="cn('grid gap-1 [&:not(:last-child)]:pb-2', className)"
    data-slot="command-palette-item-group"
  >
    <slot />
  </ArkComboboxItemGroup>
</template>