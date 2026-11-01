<script setup lang="ts">
import { NumberInputControl as ArkNumberInputControl } from '@ark-ui/vue/number-input';
import type { NumberInputControlProps } from '@ark-ui/vue/number-input';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ NumberInputControlProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkNumberInputControl
    v-bind="attrs"
    :class="
      cn(
        'group/number-input-control inline-flex rounded-md outline-focus-halo outline-transparent transition-[outline-color] duration-normal ease-in-out focus-within:outline-ring/50 group-data-invalid/number-input:focus-within:outline-destructive/20',
        className,
      )
    "
    data-slot="number-input-control"
  >
    <slot />
  </ArkNumberInputControl>
</template>