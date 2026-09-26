<script setup lang="ts">
import { ComboboxLabel as ArkComboboxLabel } from '@ark-ui/vue/combobox';
import type { ComboboxLabelProps } from '@ark-ui/vue/combobox';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ComboboxLabelProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkComboboxLabel
    v-bind="attrs"
    :class="
      cn(
        'inline-flex items-center text-sm font-medium text-foreground select-none data-disabled:opacity-50',
        className,
      )
    "
    data-slot="combobox-label"
  >
    <slot />
  </ArkComboboxLabel>
</template>