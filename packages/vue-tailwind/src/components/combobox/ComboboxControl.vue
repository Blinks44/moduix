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
        'group/combobox-control relative flex w-full min-w-0 items-center rounded-md border border-input bg-background text-foreground outline-focus-halo outline-transparent transition-[border-color,outline-color] duration-normal ease-in-out data-disabled:opacity-disabled data-focus:border-ring data-focus:outline-ring/50 data-invalid:border-destructive data-invalid:data-focus:outline-destructive/20 data-[state=open]:border-ring data-[state=open]:outline-ring/50 data-invalid:data-[state=open]:outline-destructive/20',
        className,
      )
    "
    data-slot="combobox-control"
  >
    <slot />
  </ArkComboboxControl>
</template>