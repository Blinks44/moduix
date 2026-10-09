<script setup lang="ts">
import { ComboboxEmpty as ArkComboboxEmpty } from '@ark-ui/vue/combobox';
import type { ComboboxEmptyProps } from '@ark-ui/vue/combobox';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ ComboboxEmptyProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkComboboxEmpty
    v-bind="attrs"
    :class="
      cn(
        '[&:not(:empty)]:px-4 [&:not(:empty)]:py-3 [&:not(:empty)]:text-sm [&:not(:empty)]:leading-5 [&:not(:empty)]:text-muted-foreground',
        className,
      )
    "
    data-slot="command-palette-empty"
  >
    <slot />
  </ArkComboboxEmpty>
</template>