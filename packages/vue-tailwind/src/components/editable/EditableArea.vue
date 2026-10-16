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
  'box-border flex min-h-control-md min-w-0 items-center rounded-md border border-border bg-background px-3.5 py-1 text-md leading-6 outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color] duration-200 ease-in-out has-focus-visible:outline-ring has-data-invalid:border-destructive has-data-invalid:has-focus-visible:outline-destructive data-disabled:pointer-events-none data-focus:outline-ring has-data-invalid:data-focus:outline-destructive motion-reduce:transition-none';
</script>

<template>
  <ArkEditableArea v-bind="attrs" :class="cn(areaClass, className)" data-slot="editable-area">
    <slot />
  </ArkEditableArea>
</template>