<script setup lang="ts">
import { EditableSubmitTrigger as ArkEditableSubmitTrigger } from '@ark-ui/vue/editable';
import type { EditableSubmitTriggerProps } from '@ark-ui/vue/editable';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { CheckIcon } from '@/lib/moduix/icons/ui';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ EditableSubmitTriggerProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const triggerClass =
  'inline-flex size-control-md shrink-0 cursor-pointer items-center justify-center rounded-sm border border-border bg-background text-foreground outline-focus-inset outline-offset-focus-inset outline-transparent transition-[background-color,outline-color] duration-normal ease-in-out focus-visible:outline-ring active:bg-accent disabled:pointer-events-none [&>svg]:size-4 [&>svg]:shrink-0 [@media(hover:hover)]:hover:bg-accent';
</script>

<template>
  <ArkEditableSubmitTrigger
    v-bind="attrs"
    :as-child="asChild"
    :class="cn(!asChild && triggerClass, className)"
    data-slot="editable-submit-trigger"
  >
    <slot><CheckIcon /></slot>
  </ArkEditableSubmitTrigger>
</template>