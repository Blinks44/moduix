<script setup lang="ts">
import { NumberInputRoot as ArkNumberInputRoot } from '@ark-ui/vue/number-input';
import type { NumberInputRootEmits, NumberInputRootProps } from '@ark-ui/vue/number-input';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ NumberInputRootProps {
  class?: HTMLAttributes['class'];
}

export interface Emits extends /* @vue-ignore */ NumberInputRootEmits {}

const { class: className } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkNumberInputRoot
    v-bind="attrs"
    :class="
      cn(
        'group/number-input flex w-auto max-w-none flex-col items-start gap-1 data-disabled:opacity-50',
        className,
      )
    "
    data-slot="number-input-root"
  >
    <slot />
  </ArkNumberInputRoot>
</template>