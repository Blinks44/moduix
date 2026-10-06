<script setup lang="ts">
import { FieldTextarea as ArkFieldTextarea } from '@ark-ui/vue/field';
import type { FieldTextareaProps } from '@ark-ui/vue/field';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FieldTextareaProps {
  class?: HTMLAttributes['class'];
}

export interface Emits {
  'update:modelValue': [value: FieldTextareaProps['modelValue']];
}

const { class: className } = defineProps<Props>();
defineEmits</* @vue-ignore */ Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFieldTextarea
    v-bind="attrs"
    :class="
      cn(
        'min-h-20 w-full resize-y rounded-md border border-border bg-background px-3.5 py-1 text-md leading-6 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color] duration-200 ease-in-out placeholder:text-muted-foreground focus-visible:outline-ring disabled:pointer-events-none data-disabled:pointer-events-none data-invalid:border-destructive data-invalid:focus-visible:outline-destructive motion-reduce:transition-none',
        className,
      )
    "
    data-slot="field-textarea"
  >
    <slot />
  </ArkFieldTextarea>
</template>