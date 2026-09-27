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
  'col-start-1 box-border inline-flex min-h-control-md w-full min-w-0 items-center rounded-md border border-border bg-background px-3.5 py-1 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color,opacity] duration-200 ease-in-out has-[[aria-invalid=true]]:border-destructive has-[[data-invalid]]:border-destructive data-disabled:pointer-events-none data-focus:outline-ring data-focus:has-[[aria-invalid=true]]:outline-destructive data-focus:has-[[data-invalid]]:outline-destructive motion-reduce:transition-none';
</script>

<template>
  <ArkEditableArea v-bind="attrs" :class="cn(areaClass, className)" data-slot="editable-area">
    <slot />
  </ArkEditableArea>
</template>