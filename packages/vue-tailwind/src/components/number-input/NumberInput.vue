<script setup lang="ts">
import { NumberInputRoot as ArkNumberInputRoot } from '@ark-ui/vue/number-input';
import type { NumberInputRootEmits, NumberInputRootProps } from '@ark-ui/vue/number-input';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export type NumberInputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface Props extends /* @vue-ignore */ NumberInputRootProps {
  class?: HTMLAttributes['class'];
  size?: NumberInputSize;
}

export interface Emits extends /* @vue-ignore */ NumberInputRootEmits {}

const { class: className, size = 'md' } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkNumberInputRoot
    v-bind="attrs"
    :class="
      cn(
        'group/number-input flex flex-col items-start gap-1 data-disabled:opacity-50 [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100',
        className,
      )
    "
    :data-size="size"
    data-slot="number-input-root"
  >
    <slot />
  </ArkNumberInputRoot>
</template>