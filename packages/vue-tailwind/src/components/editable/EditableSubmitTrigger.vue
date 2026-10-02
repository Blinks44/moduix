<script setup lang="ts">
import { EditableSubmitTrigger as ArkEditableSubmitTrigger } from '@ark-ui/vue/editable';
import type { EditableSubmitTriggerProps } from '@ark-ui/vue/editable';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { CheckIcon } from '@/lib/moduix/icons/ui';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ EditableSubmitTriggerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const triggerClass =
  'box-border inline-flex size-control-md shrink-0 cursor-pointer items-center justify-center rounded-sm border border-border bg-background text-foreground outline-1 -outline-offset-1 outline-transparent transition-[background-color,border-color,color,outline-color,opacity] duration-200 ease-in-out focus-visible:outline-ring active:bg-accent disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 data-focus:outline-ring motion-reduce:transition-none [&>svg]:size-4 [&>svg]:shrink-0 [@media(hover:hover)]:hover:bg-accent';
</script>

<template>
  <ArkEditableSubmitTrigger
    v-bind="attrs"
    :class="cn(triggerClass, className)"
    data-slot="editable-submit-trigger"
  >
    <slot><CheckIcon /></slot>
  </ArkEditableSubmitTrigger>
</template>