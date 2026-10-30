<script setup lang="ts">
import { EditableArea as ArkEditableArea } from '@ark-ui/vue/editable';
import type { EditableAreaProps } from '@ark-ui/vue/editable';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ EditableAreaProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const areaClass =
  'flex min-h-control-md min-w-0 items-center rounded-md border border-input bg-background px-3.5 py-1 text-md leading-6 outline-focus-halo outline-transparent transition-[border-color,outline-color] duration-normal ease-in-out has-focus-visible:outline-ring/50 has-focus-visible:border-ring has-data-invalid:border-destructive has-data-invalid:has-focus-visible:outline-destructive/20 data-disabled:pointer-events-none data-focus:outline-ring/50 data-focus:border-ring has-data-invalid:data-focus:outline-destructive/20';
</script>

<template>
  <ArkEditableArea v-bind="attrs" :class="cn(areaClass, className)" data-slot="editable-area">
    <slot />
  </ArkEditableArea>
</template>