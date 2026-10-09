<script setup lang="ts">
import { ComboboxItemIndicator as ArkComboboxItemIndicator } from '@ark-ui/vue/combobox';
import type { ComboboxItemIndicatorProps } from '@ark-ui/vue/combobox';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { CheckIcon } from '@/lib/moduix/icons/ui/Icons';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ ComboboxItemIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkComboboxItemIndicator
    v-bind="attrs"
    :class="
      cn(
        'inline-flex size-8 items-center justify-center justify-self-end rounded-md border border-transparent bg-transparent text-muted-foreground [&>svg]:size-4 [&>svg]:shrink-0',
        className,
      )
    "
    data-slot="command-palette-item-indicator"
  >
    <slot><CheckIcon /></slot>
  </ArkComboboxItemIndicator>
</template>