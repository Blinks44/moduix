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
const attrs = useAttrs();
</script>

<template>
  <ArkSelectValueText
    v-if="!$slots.default"
    v-bind="attrs"
    :class="cn('min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap', className)"
    data-slot="select-value-text"
  />
  <ArkSelectValueText
    v-else
    v-bind="attrs"
    :class="cn('min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap', className)"
    data-slot="select-value-text"
    ><slot
  /></ArkSelectValueText>
</template>