<script setup lang="ts">
import { NumberInputValueText as ArkNumberInputValueText } from '@ark-ui/vue/number-input';
import type { NumberInputValueTextProps } from '@ark-ui/vue/number-input';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ NumberInputValueTextProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkNumberInputValueText
    v-bind="attrs"
    :class="cn('text-sm leading-5 text-muted-foreground tabular-nums', className)"
    data-slot="number-input-value-text"
  >
    <template v-if="$slots.default" #default>
      <slot />
    </template>
  </ArkNumberInputValueText>
</template>