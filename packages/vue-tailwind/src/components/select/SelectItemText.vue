<script setup lang="ts">
import { SelectItemText as ArkSelectItemText } from '@ark-ui/vue/select';
import type { SelectItemTextProps } from '@ark-ui/vue/select';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SelectItemTextProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSelectItemText
    v-bind="attrs"
    :class="cn('min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap', className)"
    data-slot="select-item-text"
  >
    <slot />
  </ArkSelectItemText>
</template>