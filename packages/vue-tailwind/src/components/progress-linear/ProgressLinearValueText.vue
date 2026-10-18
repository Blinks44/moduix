<script setup lang="ts">
import { ProgressValueText as ArkProgressValueText } from '@ark-ui/vue/progress';
import type { ProgressValueTextProps } from '@ark-ui/vue/progress';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ProgressValueTextProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkProgressValueText
    v-bind="attrs"
    :class="cn('justify-self-end text-end text-sm wrap-anywhere', className)"
    data-slot="progress-linear-value-text"
  >
    <template v-if="$slots.default" #default><slot /></template>
  </ArkProgressValueText>
</template>