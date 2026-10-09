<script setup lang="ts">
import { ComboboxControl as ArkComboboxControl } from '@ark-ui/vue/combobox';
import type { ComboboxControlProps } from '@ark-ui/vue/combobox';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ComboboxControlProps {
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
        'group/combobox-control relative flex w-full min-w-0 items-center rounded-md border border-border bg-background text-foreground outline-1 -outline-offset-1 outline-transparent transition-[background-color,border-color,outline-color] duration-200 ease-in-out data-disabled:opacity-50 data-focus:border-ring data-focus:outline-ring data-invalid:border-destructive data-invalid:outline-destructive data-[state=open]:border-ring data-[state=open]:outline-ring motion-reduce:transition-none',
        className,
      )
    "
    data-slot="combobox-control"
  >
    <slot />
  </ArkComboboxControl>
</template>