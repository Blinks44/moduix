<script setup lang="ts">
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import Separator from '../separator/Separator.vue';
import type { Props as SeparatorProps } from '../separator/Separator.vue';

defineOptions({ inheritAttrs: false });
export interface Props extends /* @vue-ignore */ SeparatorProps {
  class?: HTMLAttributes['class'];
}
const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <Separator v-bind="attrs" :class="cn('border-border', props.class)"><slot /></Separator>
</template>