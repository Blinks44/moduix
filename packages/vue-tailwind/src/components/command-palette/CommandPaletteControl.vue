<script setup lang="ts">
import { ComboboxControl as ArkComboboxControl } from '@ark-ui/vue/combobox';
import type { ComboboxControlProps } from '@ark-ui/vue/combobox';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ ComboboxControlProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkComboboxControl
    v-bind="attrs"
    :class="
      cn(
        'relative mx-3 mt-3 flex min-h-control-md flex-none items-center gap-2 rounded-md border border-border bg-background px-3 py-1 text-foreground transition-[background-color,border-color] duration-200 ease-in-out has-[[aria-invalid=true]]:border-destructive has-[[data-invalid]]:border-destructive',
        className,
      )
    "
    data-slot="command-palette-control"
  >
    <slot />
  </ArkComboboxControl>
</template>