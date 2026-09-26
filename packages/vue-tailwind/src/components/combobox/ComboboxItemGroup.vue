<script setup lang="ts">
import { ComboboxItemGroup as ArkComboboxItemGroup } from '@ark-ui/vue/combobox';
import type { ComboboxItemGroupProps } from '@ark-ui/vue/combobox';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ComboboxItemGroupProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkComboboxItemGroup
    v-bind="attrs"
    :class="cn('flex flex-col [&+&]:mt-2', className)"
    data-slot="combobox-item-group"
  >
    <slot />
  </ArkComboboxItemGroup>
</template>