<script setup lang="ts">
import { EditableInput as ArkEditableInput } from '@ark-ui/vue/editable';
import type { EditableInputProps } from '@ark-ui/vue/editable';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ EditableInputProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkEditableInput
    v-bind="attrs"
    :class="
      cn(
        'box-border block w-full min-w-0 appearance-none bg-transparent text-md leading-6 text-inherit outline-0 placeholder:text-muted-foreground [&:is(textarea)]:min-h-24 [&:is(textarea)]:resize-y',
        props.class,
      )
    "
    data-slot="editable-input"
  >
    <slot />
  </ArkEditableInput>
</template>