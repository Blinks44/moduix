<script setup lang="ts">
import { SelectValueText as ArkSelectValueText } from '@ark-ui/vue/select';
import type { SelectValueTextProps } from '@ark-ui/vue/select';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SelectValueTextProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
const slots = defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkSelectValueText
    v-bind="attrs"
    :class="cn('min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap', className)"
    data-slot="select-value-text"
  >
    <template v-if="slots.default" #default>
      <slot />
    </template>
  </ArkSelectValueText>
</template>