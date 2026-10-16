<script setup lang="ts">
import { EditableControl as ArkEditableControl } from '@ark-ui/vue/editable';
import type { EditableControlProps } from '@ark-ui/vue/editable';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ EditableControlProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkEditableControl
    v-bind="attrs"
    :class="cn('flex items-center gap-1', className)"
    data-slot="editable-control"
  >
    <slot />
  </ArkEditableControl>
</template>