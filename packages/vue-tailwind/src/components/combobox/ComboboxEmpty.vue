<script setup lang="ts">
import { ComboboxEmpty as ArkComboboxEmpty } from '@ark-ui/vue/combobox';
import type { ComboboxEmptyProps } from '@ark-ui/vue/combobox';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ComboboxEmptyProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkComboboxEmpty
    v-bind="attrs"
    :class="cn('px-4 py-1 text-sm text-muted-foreground', className)"
    data-slot="combobox-empty"
  >
    <slot />
  </ArkComboboxEmpty>
</template>