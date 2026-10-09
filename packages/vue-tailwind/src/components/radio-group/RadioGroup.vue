<script setup lang="ts">
import { RadioGroupRoot as ArkRadioGroupRoot } from '@ark-ui/vue/radio-group';
import type { RadioGroupRootEmits, RadioGroupRootProps } from '@ark-ui/vue/radio-group';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ RadioGroupRootProps {
  class?: HTMLAttributes['class'];
}

export interface Emits extends /* @vue-ignore */ RadioGroupRootEmits {}

const { class: className } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkRadioGroupRoot
    v-bind="attrs"
    :class="
      cn('relative flex flex-col gap-2 text-foreground data-disabled:cursor-default', className)
    "
    data-slot="radio-group-root"
  >
    <slot />
  </ArkRadioGroupRoot>
</template>