<script setup lang="ts">
import { EditableRoot as ArkEditableRoot } from '@ark-ui/vue/editable';
import type { EditableRootEmits, EditableRootProps } from '@ark-ui/vue/editable';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ EditableRootProps {
  activationMode?: EditableRootProps['activationMode'];
  class?: HTMLAttributes['class'];
}

export interface Emits extends /* @vue-ignore */ EditableRootEmits {}

const { activationMode = 'dblclick', class: className } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const rootClass =
  'box-border inline-grid max-w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-1 text-foreground has-[[data-disabled]]:opacity-50';
</script>

<template>
  <ArkEditableRoot
    v-bind="attrs"
    :activation-mode="activationMode"
    :class="cn(rootClass, className)"
    data-slot="editable-root"
  >
    <slot />
  </ArkEditableRoot>
</template>